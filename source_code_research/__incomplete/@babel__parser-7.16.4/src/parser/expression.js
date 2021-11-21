// @flow

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

import {
  tokenCanStartExpression,
  tokenIsAssignment,
  tokenIsIdentifier,
  tokenIsKeywordOrIdentifier,
  tokenIsOperator,
  tokenIsPostfix,
  tokenIsPrefix,
  tokenIsRightAssociative,
  tokenKeywordOrIdentifierIsKeyword,
  tokenLabelName,
  tokenOperatorPrecedence,
  tt,
  type TokenType,
} from "../tokenizer/types";
import * as N from "../types";
import LValParser from "./lval";
import {
  isKeyword,
  isReservedWord,
  isStrictReservedWord,
  isStrictBindReservedWord,
  isIdentifierStart,
  canBeReservedWord,
} from "../util/identifier";
import { Position } from "../util/location";
import * as charCodes from "charcodes";
import {
  BIND_OUTSIDE,
  BIND_VAR,
  SCOPE_ARROW,
  SCOPE_CLASS,
  SCOPE_DIRECT_SUPER,
  SCOPE_FUNCTION,
  SCOPE_SUPER,
} from "../util/scopeflags";
import { ExpressionErrors } from "./util";
import {
  PARAM_AWAIT,
  PARAM_IN,
  PARAM_RETURN,
  functionFlags,
} from "../util/production-parameter";
import {
  newArrowHeadScope,
  newAsyncArrowScope,
  newExpressionScope,
} from "../util/expression-scope";
import { Errors, SourceTypeModuleErrors } from "./error";
import type { ParsingError } from "./error";
import { setInnerComments } from "./comments";
import { cloneIdentifier } from "./node";

/*::
import type { SourceType } from "../options";
*/

const invalidHackPipeBodies = new Map([
  ["ArrowFunctionExpression", "arrow function"],
  ["AssignmentExpression", "assignment"],
  ["ConditionalExpression", "conditional"],
  ["YieldExpression", "yield"],
]);

export default class ExpressionParser extends LValParser {
  // Forward-declaration: defined in statement.js
  /*::
  +parseBlock: (
    allowDirectives?: boolean,
    createNewLexicalScope?: boolean,
    afterBlockParse?: (hasStrictModeDirective: boolean) => void,
  ) => N.BlockStatement;
  +parseClass: (
    node: N.Class,
    isStatement: boolean,
    optionalId?: boolean,
  ) => N.Class;
  +parseDecorators: (allowExport?: boolean) => void;
  +parseFunction: <T: N.NormalFunction>(
    node: T,
    statement?: number,
    allowExpressionBody?: boolean,
    isAsync?: boolean,
  ) => T;
  +parseFunctionParams: (node: N.Function, allowModifiers?: boolean) => void;
  +takeDecorators: (node: N.HasDecorators) => void;
  +parseBlockOrModuleBlockBody: (
    body: N.Statement[],
    directives: ?(N.Directive[]),
    topLevel: boolean,
    end: TokenType,
    afterBlockParse?: (hasStrictModeDirective: boolean) => void
  ) => void
  +parseProgram: (
    program: N.Program, end: TokenType, sourceType?: SourceType
  ) => N.Program
  */

  // For object literal, check if property __proto__ has been used more than once.
  // If the expression is a destructuring assignment, then __proto__ may appear
  // multiple times. Otherwise, __proto__ is a duplicated key.

  // For record expression, check if property __proto__ exists

  checkProto(
    prop: N.ObjectMember | N.SpreadElement,
    isRecord: ?boolean,
    protoRef: { used: boolean },
    refExpressionErrors: ?ExpressionErrors,
  ): void {
    if (
      prop.type === "SpreadElement" ||
      this.isObjectMethod(prop) ||
      prop.computed ||
      // $FlowIgnore
      prop.shorthand
    ) {
      return;
    }

    const key = prop.key;
    // It is either an Identifier or a String/NumericLiteral
    const name = key.type === "Identifier" ? key.name : key.value;

    if (name === "__proto__") {
      if (isRecord) {
        this.raise(key.start, Errors.RecordNoProto);
        return;
      }
      if (protoRef.used) {
        if (refExpressionErrors) {
          // Store the first redefinition's position, otherwise ignore because
          // we are parsing ambiguous pattern
          if (refExpressionErrors.doubleProto === -1) {
            refExpressionErrors.doubleProto = key.start;
          }
        } else {
          this.raise(key.start, Errors.DuplicateProto);
        }
      }

      protoRef.used = true;
    }
  }

  shouldExitDescending(expr: N.Expression, potentialArrowAt: number): boolean {
    return (
      expr.type === "ArrowFunctionExpression" && expr.start === potentialArrowAt
    );
  }

  // Convenience method to parse an Expression only
  getExpression(): N.Expression & N.ParserOutput {
    this.enterInitialScopes();
    this.nextToken();
    const expr = this.parseExpression();
    if (!this.match(tt.eof)) {
      this.unexpected();
    }
    // Unlike parseTopLevel, we need to drain remaining commentStacks
    // because the top level node is _not_ Program.
    this.finalizeRemainingComments();
    expr.comments = this.state.comments;
    expr.errors = this.state.errors;
    if (this.options.tokens) {
      expr.tokens = this.tokens;
    }
    return expr;
  }

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function (s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression.
  // - `disallowIn`
  //   is used to forbid the `in` operator (in for loops initialization expressions)
  //   When `disallowIn` is true, the production parameter [In] is not present.

  // - `refExpressionErrors `
  //   provides reference for storing '=' operator inside shorthand
  //   property assignment in contexts where both object expression
  //   and object pattern might appear (so it's possible to raise
  //   delayed syntax error at correct position).

  parseExpression(
    disallowIn?: boolean,
    refExpressionErrors?: ExpressionErrors,
  ): N.Expression {
    if (disallowIn) {
      return this.disallowInAnd(() =>
        this.parseExpressionBase(refExpressionErrors),
      );
    }
    return this.allowInAnd(() => this.parseExpressionBase(refExpressionErrors));
  }

  // https://tc39.es/ecma262/#prod-Expression
  parseExpressionBase(refExpressionErrors?: ExpressionErrors): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const expr = this.parseMaybeAssign(refExpressionErrors);
    if (this.match(tt.comma)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];
      while (this.eat(tt.comma)) {
        node.expressions.push(this.parseMaybeAssign(refExpressionErrors));
      }
      this.toReferencedList(node.expressions);
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  }

  // Set [~In] parameter for assignment expression
  parseMaybeAssignDisallowIn(
    refExpressionErrors?: ?ExpressionErrors,
    afterLeftParse?: Function,
  ) {
    return this.disallowInAnd(() =>
      this.parseMaybeAssign(refExpressionErrors, afterLeftParse),
    );
  }

  // Set [+In] parameter for assignment expression
  parseMaybeAssignAllowIn(
    refExpressionErrors?: ?ExpressionErrors,
    afterLeftParse?: Function,
  ) {
    return this.allowInAnd(() =>
      this.parseMaybeAssign(refExpressionErrors, afterLeftParse),
    );
  }

  // This method is only used by
  // the typescript and flow plugins.
  setOptionalParametersError(
    refExpressionErrors: ExpressionErrors,
    resultError?: ParsingError,
  ) {
    refExpressionErrors.optionalParameters =
      resultError?.pos ?? this.state.start;
  }

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.
  // https://tc39.es/ecma262/#prod-AssignmentExpression
  parseMaybeAssign(
    refExpressionErrors?: ?ExpressionErrors,
    afterLeftParse?: Function,
  ): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    if (this.isContextual(tt._yield)) {
      if (this.prodParam.hasYield) {
        let left = this.parseYield();
        if (afterLeftParse) {
          left = afterLeftParse.call(this, left, startPos, startLoc);
        }
        return left;
      }
    }

    let ownExpressionErrors;
    if (refExpressionErrors) {
      ownExpressionErrors = false;
    } else {
      refExpressionErrors = new ExpressionErrors();
      ownExpressionErrors = true;
    }
    const { type } = this.state;

    if (type === tt.parenL || tokenIsIdentifier(type)) {
      this.state.potentialArrowAt = this.state.start;
    }

    let left = this.parseMaybeConditional(refExpressionErrors);
    if (afterLeftParse) {
      left = afterLeftParse.call(this, left, startPos, startLoc);
    }
    if (tokenIsAssignment(this.state.type)) {
      const node = this.startNodeAt(startPos, startLoc);
      const operator = this.state.value;
      node.operator = operator;

      if (this.match(tt.eq)) {
        node.left = this.toAssignable(left, /* isLHS */ true);

        if (refExpressionErrors.doubleProto >= startPos) {
          refExpressionErrors.doubleProto = -1; // reset because double __proto__ is valid in assignment expression
        }
        if (refExpressionErrors.shorthandAssign >= startPos) {
          refExpressionErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
        }
      } else {
        node.left = left;
      }

      this.checkLVal(left, "assignment expression");
      this.next();
      node.right = this.parseMaybeAssign();
      return this.finishNode(node, "AssignmentExpression");
    } else if (ownExpressionErrors) {
      this.checkExpressionErrors(refExpressionErrors, true);
    }

    return left;
  }

  // Parse a ternary conditional (`?:`) operator.
  // https://tc39.es/ecma262/#prod-ConditionalExpression

  parseMaybeConditional(refExpressionErrors: ExpressionErrors): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const potentialArrowAt = this.state.potentialArrowAt;
    const expr = this.parseExprOps(refExpressionErrors);

    if (this.shouldExitDescending(expr, potentialArrowAt)) {
      return expr;
    }

    return this.parseConditional(expr, startPos, startLoc, refExpressionErrors);
  }

  parseConditional(
    expr: N.Expression,
    startPos: number,
    startLoc: Position,
    // eslint-disable-next-line no-unused-vars
    refExpressionErrors?: ?ExpressionErrors,
  ): N.Expression {
    if (this.eat(tt.question)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssignAllowIn();
      this.expect(tt.colon);
      node.alternate = this.parseMaybeAssign();
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  }

  parseMaybeUnaryOrPrivate(
    refExpressionErrors?: ExpressionErrors,
  ): N.Expression | N.PrivateName {
    return this.match(tt.privateName)
      ? this.parsePrivateName()
      : this.parseMaybeUnary(refExpressionErrors);
  }

  // Start the precedence parser.
  // https://tc39.es/ecma262/#prod-ShortCircuitExpression

  parseExprOps(refExpressionErrors: ExpressionErrors): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const potentialArrowAt = this.state.potentialArrowAt;
    const expr = this.parseMaybeUnaryOrPrivate(refExpressionErrors);

    if (this.shouldExitDescending(expr, potentialArrowAt)) {
      return expr;
    }

    return this.parseExprOp(expr, startPos, startLoc, -1);
  }

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  parseExprOp(
    left: N.Expression | N.PrivateName,
    leftStartPos: number,
    leftStartLoc: Position,
    minPrec: number,
  ): N.Expression {
    if (this.isPrivateName(left)) {
      // https://tc39.es/ecma262/#prod-RelationalExpression
      // RelationalExpression [In, Yield, Await]
      //   [+In] PrivateIdentifier in ShiftExpression[?Yield, ?Await]

      const value = this.getPrivateNameSV(left);
      const { start } = left;

      if (
        minPrec >= tokenOperatorPrecedence(tt._in) ||
        !this.prodParam.hasIn ||
        !this.match(tt._in)
      ) {
        this.raise(start, Errors.PrivateInExpectedIn, value);
      }

      this.classScope.usePrivateName(value, start);
    }

    const op = this.state.type;
    if (tokenIsOperator(op) && (this.prodParam.hasIn || !this.match(tt._in))) {
      let prec = tokenOperatorPrecedence(op);
      if (prec > minPrec) {
        if (op === tt.pipeline) {
          this.expectPlugin("pipelineOperator");
          if (this.state.inFSharpPipelineDirectBody) {
            return left;
          }
          this.checkPipelineAtInfixOperator(left, leftStartPos);
        }
        const node = this.startNodeAt(leftStartPos, leftStartLoc);
        node.left = left;
        node.operator = this.state.value;

        const logical = op === tt.logicalOR || op === tt.logicalAND;
        const coalesce = op === tt.nullishCoalescing;

        if (coalesce) {
          // Handle the precedence of `tt.coalesce` as equal to the range of logical expressions.
          // In other words, `node.right` shouldn't contain logical expressions in order to check the mixed error.
          prec = tokenOperatorPrecedence(tt.logicalAND);
        }

        this.next();

        if (
          op === tt.pipeline &&
          this.getPluginOption("pipelineOperator", "proposal") === "minimal"
        ) {
          if (this.state.type === tt._await && this.prodParam.hasAwait) {
            throw this.raise(
              this.state.start,
              Errors.UnexpectedAwaitAfterPipelineBody,
            );
          }
        }

        node.right = this.parseExprOpRightExpr(op, prec);
        this.finishNode(
          node,
          logical || coalesce ? "LogicalExpression" : "BinaryExpression",
        );
        /* this check is for all ?? operators
         * a ?? b && c for this example
         * when op is coalesce and nextOp is logical (&&), throw at the pos of nextOp that it can not be mixed.
         * Symmetrically it also throws when op is logical and nextOp is coalesce
         */
        const nextOp = this.state.type;
        if (
          (coalesce && (nextOp === tt.logicalOR || nextOp === tt.logicalAND)) ||
          (logical && nextOp === tt.nullishCoalescing)
        ) {
          throw this.raise(this.state.start, Errors.MixingCoalesceWithLogical);
        }

        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec);
      }
    }
    return left;
  }

  // Helper function for `parseExprOp`. Parse the right-hand side of binary-
  // operator expressions, then apply any operator-specific functions.

  parseExprOpRightExpr(op: TokenType, prec: number): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    switch (op) {
      case tt.pipeline:
        switch (this.getPluginOption("pipelineOperator", "proposal")) {
          case "hack":
            return this.withTopicBindingContext(() => {
              return this.parseHackPipeBody();
            });

          case "smart":
            return this.withTopicBindingContext(() => {
              if (this.prodParam.hasYield && this.isContextual(tt._yield)) {
                throw this.raise(
                  this.state.start,
                  Errors.PipeBodyIsTighter,
                  this.state.value,
                );
              }
              return this.parseSmartPipelineBodyInStyle(
                this.parseExprOpBaseRightExpr(op, prec),
                startPos,
                startLoc,
              );
            });

          case "fsharp":
            return this.withSoloAwaitPermittingContext(() => {
              return this.parseFSharpPipelineBody(prec);
            });
        }

      // Falls through.
      default:
        return this.parseExprOpBaseRightExpr(op, prec);
    }
  }

  // Helper function for `parseExprOpRightExpr`. Parse the right-hand side of
  // binary-operator expressions without applying any operator-specific functions.

  parseExprOpBaseRightExpr(op: TokenType, prec: number): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;

    return this.parseExprOp(
      this.parseMaybeUnaryOrPrivate(),
      startPos,
      startLoc,
      tokenIsRightAssociative(op) ? prec - 1 : prec,
    );
  }

  parseHackPipeBody(): N.Expression {
    const { start } = this.state;

    const body = this.parseMaybeAssign();

    // TODO: Check how to handle type casts in Flow and TS once they are supported
    if (invalidHackPipeBodies.has(body.type) && !body.extra?.parenthesized) {
      this.raise(
        start,
        Errors.PipeUnparenthesizedBody,
        invalidHackPipeBodies.get(body.type),
      );
    }
    if (!this.topicReferenceWasUsedInCurrentContext()) {
      // A Hack pipe body must use the topic reference at least once.
      this.raise(start, Errors.PipeTopicUnused);
    }

    return body;
  }

  checkExponentialAfterUnary(node: N.AwaitExpression | N.UnaryExpression) {
    if (this.match(tt.exponent)) {
      this.raise(
        node.argument.start,
        Errors.UnexpectedTokenUnaryExponentiation,
      );
    }
  }

  // Parse unary operators, both prefix and postfix.
  // https://tc39.es/ecma262/#prod-UnaryExpression
  parseMaybeUnary(
    refExpressionErrors: ?ExpressionErrors,
    sawUnary?: boolean,
  ): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const isAwait = this.isContextual(tt._await);

    if (isAwait && this.isAwaitAllowed()) {
      this.next();
      const expr = this.parseAwait(startPos, startLoc);
      if (!sawUnary) this.checkExponentialAfterUnary(expr);
      return expr;
    }
    const update = this.match(tt.incDec);
    const node = this.startNode();
    if (tokenIsPrefix(this.state.type)) {
      node.operator = this.state.value;
      node.prefix = true;

      if (this.match(tt._throw)) {
        this.expectPlugin("throwExpressions");
      }
      const isDelete = this.match(tt._delete);
      this.next();

      node.argument = this.parseMaybeUnary(null, true);

      this.checkExpressionErrors(refExpressionErrors, true);

      if (this.state.strict && isDelete) {
        const arg = node.argument;

        if (arg.type === "Identifier") {
          this.raise(node.start, Errors.StrictDelete);
        } else if (this.hasPropertyAsPrivateName(arg)) {
          this.raise(node.start, Errors.DeletePrivateField);
        }
      }

      if (!update) {
        if (!sawUnary) this.checkExponentialAfterUnary(node);
        return this.finishNode(node, "UnaryExpression");
      }
    }

    const expr = this.parseUpdate(node, update, refExpressionErrors);

    if (isAwait) {
      const { type } = this.state;
      const startsExpr = this.hasPlugin("v8intrinsic")
        ? tokenCanStartExpression(type)
        : tokenCanStartExpression(type) && !this.match(tt.modulo);
      if (startsExpr && !this.isAmbiguousAwait()) {
        this.raiseOverwrite(startPos, Errors.AwaitNotInAsyncContext);
        return this.parseAwait(startPos, startLoc);
      }
    }

    return expr;
  }

  // https://tc39.es/ecma262/#prod-UpdateExpression
  parseUpdate(
    node: N.Expression,
    update: boolean,
    refExpressionErrors: ?ExpressionErrors,
  ): N.Expression {
    if (update) {
      this.checkLVal(node.argument, "prefix operation");
      return this.finishNode(node, "UpdateExpression");
    }

    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    let expr = this.parseExprSubscripts(refExpressionErrors);
    if (this.checkExpressionErrors(refExpressionErrors, false)) return expr;
    while (tokenIsPostfix(this.state.type) && !this.canInsertSemicolon()) {
      const node = this.startNodeAt(startPos, startLoc);
      node.operator = this.state.value;
      node.prefix = false;
      node.argument = expr;
      this.checkLVal(expr, "postfix operation");
      this.next();
      expr = this.finishNode(node, "UpdateExpression");
    }
    return expr;
  }

  // Parse call, dot, and `[]`-subscript expressions.
  // https://tc39.es/ecma262/#prod-LeftHandSideExpression
  parseExprSubscripts(refExpressionErrors: ?ExpressionErrors): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const potentialArrowAt = this.state.potentialArrowAt;
    const expr = this.parseExprAtom(refExpressionErrors);

    if (this.shouldExitDescending(expr, potentialArrowAt)) {
      return expr;
    }

    return this.parseSubscripts(expr, startPos, startLoc);
  }

  parseSubscripts(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    noCalls?: ?boolean,
  ): N.Expression {
    const state = {
      optionalChainMember: false,
      maybeAsyncArrow: this.atPossibleAsyncArrow(base),
      stop: false,
    };
    do {
      base = this.parseSubscript(base, startPos, startLoc, noCalls, state);

      // After parsing a subscript, this isn't "async" for sure.
      state.maybeAsyncArrow = false;
    } while (!state.stop);
    return base;
  }

  /**
   * @param state Set 'state.stop = true' to indicate that we should stop parsing subscripts.
   *   state.optionalChainMember to indicate that the member is currently in OptionalChain
   */
  parseSubscript(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    noCalls: ?boolean,
    state: N.ParseSubscriptState,
  ): N.Expression {
    if (!noCalls && this.eat(tt.doubleColon)) {
      return this.parseBind(base, startPos, startLoc, noCalls, state);
    } else if (this.match(tt.backQuote)) {
      return this.parseTaggedTemplateExpression(
        base,
        startPos,
        startLoc,
        state,
      );
    }

    let optional = false;

    if (this.match(tt.questionDot)) {
      if (noCalls && this.lookaheadCharCode() === charCodes.leftParenthesis) {
        // stop at `?.` when parsing `new a?.()`
        state.stop = true;
        return base;
      }
      state.optionalChainMember = optional = true;
      this.next();
    }

    if (!noCalls && this.match(tt.parenL)) {
      return this.parseCoverCallAndAsyncArrowHead(
        base,
        startPos,
        startLoc,
        state,
        optional,
      );
    } else {
      const computed = this.eat(tt.bracketL);
      if (computed || optional || this.eat(tt.dot)) {
        return this.parseMember(
          base,
          startPos,
          startLoc,
          state,
          computed,
          optional,
        );
      } else {
        state.stop = true;
        return base;
      }
    }
  }

  // base[?Yield, ?Await] [ Expression[+In, ?Yield, ?Await] ]
  // base[?Yield, ?Await] . IdentifierName
  // base[?Yield, ?Await] . PrivateIdentifier
  //   where `base` is one of CallExpression, MemberExpression and OptionalChain
  parseMember(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    state: N.ParseSubscriptState,
    computed: boolean,
    optional: boolean,
  ): N.OptionalMemberExpression | N.MemberExpression {
    const node = this.startNodeAt(startPos, startLoc);
    node.object = base;
    node.computed = computed;
    if (computed) {
      node.property = this.parseExpression();
      this.expect(tt.bracketR);
    } else if (this.match(tt.privateName)) {
      if (base.type === "Super") {
        this.raise(startPos, Errors.SuperPrivateField);
      }
      this.classScope.usePrivateName(this.state.value, this.state.start);
      node.property = this.parsePrivateName();
    } else {
      node.property = this.parseIdentifier(true);
    }

    if (state.optionalChainMember) {
      node.optional = optional;
      return this.finishNode(node, "OptionalMemberExpression");
    } else {
      return this.finishNode(node, "MemberExpression");
    }
  }

  // https://github.com/tc39/proposal-bind-operator#syntax
  parseBind(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    noCalls: ?boolean,
    state: N.ParseSubscriptState,
  ): N.Expression {
    const node = this.startNodeAt(startPos, startLoc);
    node.object = base;
    node.callee = this.parseNoCallExpr();
    state.stop = true;
    return this.parseSubscripts(
      this.finishNode(node, "BindExpression"),
      startPos,
      startLoc,
      noCalls,
    );
  }

  // https://tc39.es/ecma262/#prod-CoverCallExpressionAndAsyncArrowHead
  // CoverCallExpressionAndAsyncArrowHead
  // CallExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
  // OptionalChain[?Yield, ?Await] Arguments[?Yield, ?Await]
  parseCoverCallAndAsyncArrowHead(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    state: N.ParseSubscriptState,
    optional: boolean,
  ): N.Expression {
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    let refExpressionErrors = null;

    this.state.maybeInArrowParameters = true;
    this.next(); // eat `(`

    let node = this.startNodeAt(startPos, startLoc);
    node.callee = base;

    if (state.maybeAsyncArrow) {
      this.expressionScope.enter(newAsyncArrowScope());
      refExpressionErrors = new ExpressionErrors();
    }

    if (state.optionalChainMember) {
      node.optional = optional;
    }

    if (optional) {
      node.arguments = this.parseCallExpressionArguments(tt.parenR);
    } else {
      node.arguments = this.parseCallExpressionArguments(
        tt.parenR,
        base.type === "Import",
        base.type !== "Super",
        node,
        refExpressionErrors,
      );
    }
    this.finishCallExpression(node, state.optionalChainMember);

    if (state.maybeAsyncArrow && this.shouldParseAsyncArrow() && !optional) {
      state.stop = true;
      this.expressionScope.validateAsPattern();
      this.expressionScope.exit();
      node = this.parseAsyncArrowFromCallExpression(
        this.startNodeAt(startPos, startLoc),
        node,
      );
    } else {
      if (state.maybeAsyncArrow) {
        this.checkExpressionErrors(refExpressionErrors, true);
        this.expressionScope.exit();
      }
      this.toReferencedArguments(node);
    }

    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;

    return node;
  }

  toReferencedArguments(
    node: N.CallExpression | N.OptionalCallExpression,
    isParenthesizedExpr?: boolean,
  ) {
    this.toReferencedListDeep(node.arguments, isParenthesizedExpr);
  }

  // MemberExpression [?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
  // CallExpression [?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
  parseTaggedTemplateExpression(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    state: N.ParseSubscriptState,
  ): N.TaggedTemplateExpression {
    const node: N.TaggedTemplateExpression = this.startNodeAt(
      startPos,
      startLoc,
    );
    node.tag = base;
    node.quasi = this.parseTemplate(true);
    if (state.optionalChainMember) {
      this.raise(startPos, Errors.OptionalChainingNoTemplate);
    }
    return this.finishNode(node, "TaggedTemplateExpression");
  }

  atPossibleAsyncArrow(base: N.Expression): boolean {
    return (
      base.type === "Identifier" &&
      base.name === "async" &&
      this.state.lastTokEnd === base.end &&
      !this.canInsertSemicolon() &&
      // check there are no escape sequences, such as \u{61}sync
      base.end - base.start === 5 &&
      base.start === this.state.potentialArrowAt
    );
  }

  finishCallExpression<T: N.CallExpression | N.OptionalCallExpression>(
    node: T,
    optional: boolean,
  ): N.Expression {
    if (node.callee.type === "Import") {
      if (node.arguments.length === 2) {
        if (process.env.BABEL_8_BREAKING) {
          this.expectPlugin("importAssertions");
        } else {
          if (!this.hasPlugin("moduleAttributes")) {
            this.expectPlugin("importAssertions");
          }
        }
      }
      if (node.arguments.length === 0 || node.arguments.length > 2) {
        this.raise(
          node.start,
          Errors.ImportCallArity,
          this.hasPlugin("importAssertions") ||
            this.hasPlugin("moduleAttributes")
            ? "one or two arguments"
            : "one argument",
        );
      } else {
        for (const arg of node.arguments) {
          if (arg.type === "SpreadElement") {
            this.raise(arg.start, Errors.ImportCallSpreadArgument);
          }
        }
      }
    }
    return this.finishNode(
      node,
      optional ? "OptionalCallExpression" : "CallExpression",
    );
  }

  parseCallExpressionArguments(
    close: TokenType,
    dynamicImport?: boolean,
    allowPlaceholder?: boolean,
    nodeForExtra?: ?N.Node,
    refExpressionErrors?: ?ExpressionErrors,
  ): $ReadOnlyArray<?N.Expression> {
    const elts = [];
    let first = true;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = false;

    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.match(close)) {
          if (
            dynamicImport &&
            !this.hasPlugin("importAssertions") &&
            !this.hasPlugin("moduleAttributes")
          ) {
            this.raise(
              this.state.lastTokStart,
              Errors.ImportCallArgumentTrailingComma,
            );
          }
          if (nodeForExtra) {
            this.addExtra(
              nodeForExtra,
              "trailingComma",
              this.state.lastTokStart,
            );
          }
          this.next();
          break;
        }
      }

      elts.push(
        this.parseExprListItem(false, refExpressionErrors, allowPlaceholder),
      );
    }

    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;

    return elts;
  }

  shouldParseAsyncArrow(): boolean {
    return this.match(tt.arrow) && !this.canInsertSemicolon();
  }

  parseAsyncArrowFromCallExpression(
    node: N.ArrowFunctionExpression,
    call: N.CallExpression,
  ): N.ArrowFunctionExpression {
    this.resetPreviousNodeTrailingComments(call);
    this.expect(tt.arrow);
    this.parseArrowExpression(
      node,
      call.arguments,
      true,
      call.extra?.trailingComma,
    );
    // mark inner comments of `async()` as inner comments of `async () =>`
    if (call.innerComments) {
      setInnerComments(node, call.innerComments);
    }
    // mark trailing comments of `async` to be inner comments
    if (call.callee.trailingComments) {
      setInnerComments(node, call.callee.trailingComments);
    }
    return node;
  }

  // Parse a no-call expression (like argument of `new` or `::` operators).
  // https://tc39.es/ecma262/#prod-MemberExpression
  parseNoCallExpr(): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  }

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  // https://tc39.es/ecma262/#prod-PrimaryExpression
  // https://tc39.es/ecma262/#prod-AsyncArrowFunction
  // PrimaryExpression
  // Super
  // Import
  // AsyncArrowFunction

  parseExprAtom(refExpressionErrors?: ?ExpressionErrors): N.Expression {
    let node;

    const { type } = this.state;
    switch (type) {
      case tt._super:
        return this.parseSuper();

      case tt._import:
        node = this.startNode();
        this.next();

        if (this.match(tt.dot)) {
          return this.parseImportMetaProperty(node);
        }

        if (!this.match(tt.parenL)) {
          this.raise(this.state.lastTokStart, Errors.UnsupportedImport);
        }
        return this.finishNode(node, "Import");
      case tt._this:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "ThisExpression");

      case tt._do: {
        return this.parseDo(this.startNode(), false);
      }

      case tt.slash:
      case tt.slashAssign: {
        this.readRegexp();
        return this.parseRegExpLiteral(this.state.value);
      }

      case tt.num:
        return this.parseNumericLiteral(this.state.value);

      case tt.bigint:
        return this.parseBigIntLiteral(this.state.value);

      case tt.decimal:
        return this.parseDecimalLiteral(this.state.value);

      case tt.string:
        return this.parseStringLiteral(this.state.value);

      case tt._null:
        return this.parseNullLiteral();

      case tt._true:
        return this.parseBooleanLiteral(true);
      case tt._false:
        return this.parseBooleanLiteral(false);

      case tt.parenL: {
        const canBeArrow = this.state.potentialArrowAt === this.state.start;
        return this.parseParenAndDistinguishExpression(canBeArrow);
      }

      case tt.bracketBarL:
      case tt.bracketHashL: {
        return this.parseArrayLike(
          this.state.type === tt.bracketBarL ? tt.bracketBarR : tt.bracketR,
          /* canBePattern */ false,
          /* isTuple */ true,
        );
      }
      case tt.bracketL: {
        return this.parseArrayLike(
          tt.bracketR,
          /* canBePattern */ true,
          /* isTuple */ false,
          refExpressionErrors,
        );
      }
      case tt.braceBarL:
      case tt.braceHashL: {
        return this.parseObjectLike(
          this.state.type === tt.braceBarL ? tt.braceBarR : tt.braceR,
          /* isPattern */ false,
          /* isRecord */ true,
        );
      }
      case tt.braceL: {
        return this.parseObjectLike(
          tt.braceR,
          /* isPattern */ false,
          /* isRecord */ false,
          refExpressionErrors,
        );
      }
      case tt._function:
        return this.parseFunctionOrFunctionSent();

      case tt.at:
        this.parseDecorators();
      // fall through
      case tt._class:
        node = this.startNode();
        this.takeDecorators(node);
        return this.parseClass(node, false);

      case tt._new:
        return this.parseNewOrNewTarget();

      case tt.backQuote:
        return this.parseTemplate(false);

      // BindExpression[Yield]
      //   :: MemberExpression[?Yield]
      case tt.doubleColon: {
        node = this.startNode();
        this.next();
        node.object = null;
        const callee = (node.callee = this.parseNoCallExpr());
        if (callee.type === "MemberExpression") {
          return this.finishNode(node, "BindExpression");
        } else {
          throw this.raise(callee.start, Errors.UnsupportedBind);
        }
      }

      case tt.privateName: {
        // Standalone private names are only allowed in "#x in obj"
        // expressions, and they are directly handled by callers of
        // parseExprOp. If we reach this, the input is always invalid.
        // We can throw a better error message and recover, rather than
        // just throwing "Unexpected token" (which is the default
        // behavior of this big switch statement).
        this.raise(
          this.state.start,
          Errors.PrivateInExpectedIn,
          this.state.value,
        );
        return this.parsePrivateName();
      }

      case tt.moduloAssign: {
        return this.parseTopicReferenceThenEqualsSign(tt.modulo, "%");
      }

      case tt.xorAssign: {
        return this.parseTopicReferenceThenEqualsSign(tt.bitwiseXOR, "^");
      }

      case tt.bitwiseXOR:
      case tt.modulo:
      case tt.hash: {
        const pipeProposal = this.getPluginOption(
          "pipelineOperator",
          "proposal",
        );

        if (pipeProposal) {
          return this.parseTopicReference(pipeProposal);
        } else {
          throw this.unexpected();
        }
      }

      case tt.lt: {
        const lookaheadCh = this.input.codePointAt(this.nextTokenStart());
        if (
          isIdentifierStart(lookaheadCh) || // Element/Type Parameter <foo>
          lookaheadCh === charCodes.greaterThan // Fragment <>
        ) {
          this.expectOnePlugin(["jsx", "flow", "typescript"]);
          break;
        } else {
          throw this.unexpected();
        }
      }

      default:
        if (tokenIsIdentifier(type)) {
          if (
            this.isContextual(tt._module) &&
            this.lookaheadCharCode() === charCodes.leftCurlyBrace &&
            !this.hasFollowingLineBreak()
          ) {
            return this.parseModuleExpression();
          }
          const canBeArrow = this.state.potentialArrowAt === this.state.start;
          const containsEsc = this.state.containsEsc;
          const id = this.parseIdentifier();

          if (
            !containsEsc &&
            id.name === "async" &&
            !this.canInsertSemicolon()
          ) {
            const { type } = this.state;
            if (type === tt._function) {
              this.resetPreviousNodeTrailingComments(id);
              this.next();
              return this.parseFunction(
                this.startNodeAtNode(id),
                undefined,
                true,
              );
            } else if (tokenIsIdentifier(type)) {
              // If the next token begins with "=", commit to parsing an async
              // arrow function. (Peeking ahead for "=" lets us avoid a more
              // expensive full-token lookahead on this common path.)
              if (this.lookaheadCharCode() === charCodes.equalsTo) {
                // although `id` is not used in async arrow unary function,
                // we don't need to reset `async`'s trailing comments because
                // it will be attached to the upcoming async arrow binding identifier
                return this.parseAsyncArrowUnaryFunction(
                  this.startNodeAtNode(id),
                );
              } else {
                // Otherwise, treat "async" as an identifier and let calling code
                // deal with the current tt.name token.
                return id;
              }
            } else if (type === tt._do) {
              this.resetPreviousNodeTrailingComments(id);
              return this.parseDo(this.startNodeAtNode(id), true);
            }
          }

          if (
            canBeArrow &&
            this.match(tt.arrow) &&
            !this.canInsertSemicolon()
          ) {
            this.next();
            return this.parseArrowExpression(
              this.startNodeAtNode(id),
              [id],
              false,
            );
          }

          return id;
        } else {
          throw this.unexpected();
        }
    }
  }

  // This helper method should only be called
  // when the parser has reached a potential Hack pipe topic token
  // that is followed by an equals sign.
  // See <https://github.com/js-choi/proposal-hack-pipes>.
  // If we find ^= or %= in an expression position
  // (i.e., the tt.moduloAssign or tt.xorAssign token types),
  // and if the Hack-pipes proposal is active with ^ or % as its topicToken,
  // then the ^ or % could be the topic token (e.g., in x |> ^==y or x |> ^===y),
  // and so we reparse the current token as ^ or %.
  // Otherwise, this throws an unexpected-token error.
  parseTopicReferenceThenEqualsSign(
    topicTokenType: TokenType,
    topicTokenValue: string,
  ): N.Expression {
    const pipeProposal = this.getPluginOption("pipelineOperator", "proposal");

    if (pipeProposal) {
      // Set the most-recent token to be a topic token
      // given by the tokenType and tokenValue.
      // Now the next readToken() call (in parseTopicReference)
      // will consume that “topic token”.
      this.state.type = topicTokenType;
      this.state.value = topicTokenValue;
      // Rewind the tokenizer to the end of the “topic token”,
      // so that the following token starts at the equals sign after that topic token.
      this.state.pos--;
      this.state.end--;
      this.state.endLoc.column--;
      // Now actually consume the topic token.
      return this.parseTopicReference(pipeProposal);
    } else {
      throw this.unexpected();
    }
  }

  // This helper method should only be called
  // when the proposal-pipeline-operator plugin is active,
  // and when the parser has reached a potential Hack pipe topic token.
  // Although a pipe-operator proposal is assumed to be active,
  // its configuration might not match the current token’s type.
  // See <https://github.com/js-choi/proposal-hack-pipes>.
  parseTopicReference(pipeProposal: string): N.Expression {
    const node = this.startNode();
    const start = this.state.start;
    const tokenType = this.state.type;

    // Consume the current token.
    this.next();

    // If the pipe-operator plugin’s configuration matches the current token’s type,
    // then this will return `node`, will have been finished as a topic reference.
    // Otherwise, this will throw a `PipeTopicUnconfiguredToken` error.
    return this.finishTopicReference(node, start, pipeProposal, tokenType);
  }

  // This helper method attempts to finish the given `node`
  // into a topic-reference node for the given `pipeProposal`.
  // See <https://github.com/js-choi/proposal-hack-pipes>.
  //
  // The method assumes that any topic token was consumed before it was called.
  //
  // If the `pipelineOperator` plugin is active,
  // and if the given `tokenType` matches the plugin’s configuration,
  // then this method will return the finished `node`.
  //
  // If the `pipelineOperator` plugin is active,
  // but if the given `tokenType` does not match the plugin’s configuration,
  // then this method will throw a `PipeTopicUnconfiguredToken` error.
  finishTopicReference(
    node: N.Node,
    start: number,
    pipeProposal: string,
    tokenType: TokenType,
  ): N.Expression {
    if (this.testTopicReferenceConfiguration(pipeProposal, start, tokenType)) {
      // The token matches the plugin’s configuration.
      // The token is therefore a topic reference.

      // Determine the node type for the topic reference
      // that is appropriate for the active pipe-operator proposal.
      let nodeType;
      if (pipeProposal === "smart") {
        nodeType = "PipelinePrimaryTopicReference";
      } else {
        // The proposal must otherwise be "hack",
        // as enforced by testTopicReferenceConfiguration.
        nodeType = "TopicReference";
      }

      if (!this.topicReferenceIsAllowedInCurrentContext()) {
        // The topic reference is not allowed in the current context:
        // it is outside of a pipe body.
        // Raise recoverable errors.
        if (pipeProposal === "smart") {
          this.raise(start, Errors.PrimaryTopicNotAllowed);
        } else {
          // In this case, `pipeProposal === "hack"` is true.
          this.raise(start, Errors.PipeTopicUnbound);
        }
      }

      // Register the topic reference so that its pipe body knows
      // that its topic was used at least once.
      this.registerTopicReference();

      return this.finishNode(node, nodeType);
    } else {
      // The token does not match the plugin’s configuration.
      throw this.raise(
        start,
        Errors.PipeTopicUnconfiguredToken,
        tokenLabelName(tokenType),
      );
    }
  }

  // This helper method tests whether the given token type
  // matches the pipelineOperator parser plugin’s configuration.
  // If the active pipe proposal is Hack style,
  // and if the given token is the same as the plugin configuration’s `topicToken`,
  // then this is a valid topic reference.
  // If the active pipe proposal is smart mix,
  // then the topic token must always be `#`.
  // If the active pipe proposal is neither (e.g., "minimal" or "fsharp"),
  // then an error is thrown.
  testTopicReferenceConfiguration(
    pipeProposal: string,
    start: number,
    tokenType: TokenType,
  ): boolean {
    switch (pipeProposal) {
      case "hack": {
        const pluginTopicToken = this.getPluginOption(
          "pipelineOperator",
          "topicToken",
        );
        return tokenLabelName(tokenType) === pluginTopicToken;
      }
      case "smart":
        return tokenType === tt.hash;
      default:
        throw this.raise(start, Errors.PipeTopicRequiresHackPipes);
    }
  }

  // async [no LineTerminator here] AsyncArrowBindingIdentifier[?Yield] [no LineTerminator here] => AsyncConciseBody[?In]
  parseAsyncArrowUnaryFunction(node: N.Node): N.ArrowFunctionExpression {
    // We don't need to push a new ParameterDeclarationScope here since we are sure
    // 1) it is an async arrow, 2) no biding pattern is allowed in params
    this.prodParam.enter(functionFlags(true, this.prodParam.hasYield));
    const params = [this.parseIdentifier()];
    this.prodParam.exit();
    if (this.hasPrecedingLineBreak()) {
      this.raise(this.state.pos, Errors.LineTerminatorBeforeArrow);
    }
    this.expect(tt.arrow);
    // let foo = async bar => {};
    this.parseArrowExpression(node, params, true);
    return node;
  }

  // https://github.com/tc39/proposal-do-expressions
  // https://github.com/tc39/proposal-async-do-expressions
  parseDo(node: N.Node, isAsync: boolean): N.DoExpression {
    this.expectPlugin("doExpressions");
    if (isAsync) {
      this.expectPlugin("asyncDoExpressions");
    }
    node.async = isAsync;
    this.next(); // eat `do`
    const oldLabels = this.state.labels;
    this.state.labels = [];
    if (isAsync) {
      // AsyncDoExpression :
      // async [no LineTerminator here] do Block[~Yield, +Await, ~Return]
      this.prodParam.enter(PARAM_AWAIT);
      node.body = this.parseBlock();
      this.prodParam.exit();
    } else {
      node.body = this.parseBlock();
    }

    this.state.labels = oldLabels;
    return this.finishNode(node, "DoExpression");
  }

  // Parse the `super` keyword
  parseSuper(): N.Super {
    const node = this.startNode();
    this.next(); // eat `super`
    if (
      this.match(tt.parenL) &&
      !this.scope.allowDirectSuper &&
      !this.options.allowSuperOutsideMethod
    ) {
      this.raise(node.start, Errors.SuperNotAllowed);
    } else if (
      !this.scope.allowSuper &&
      !this.options.allowSuperOutsideMethod
    ) {
      this.raise(node.start, Errors.UnexpectedSuper);
    }

    if (
      !this.match(tt.parenL) &&
      !this.match(tt.bracketL) &&
      !this.match(tt.dot)
    ) {
      this.raise(node.start, Errors.UnsupportedSuper);
    }

    return this.finishNode(node, "Super");
  }

  parsePrivateName(): N.PrivateName {
    const node = this.startNode();
    const id = this.startNodeAt(
      this.state.start + 1,
      // The position is hardcoded because we merge `#` and name into a single
      // tt.privateName token
      new Position(
        this.state.curLine,
        this.state.start + 1 - this.state.lineStart,
      ),
    );
    const name = this.state.value;
    this.next(); // eat #name;
    node.id = this.createIdentifier(id, name);
    return this.finishNode(node, "PrivateName");
  }

  parseFunctionOrFunctionSent(): N.FunctionExpression | N.MetaProperty {
    const node = this.startNode();

    // We do not do parseIdentifier here because when parseFunctionOrFunctionSent
    // is called we already know that the current token is a "name" with the value "function"
    // This will improve perf a tiny little bit as we do not do validation but more importantly
    // here is that parseIdentifier will remove an item from the expression stack
    // if "function" or "class" is parsed as identifier (in objects e.g.), which should not happen here.
    this.next(); // eat `function`

    if (this.prodParam.hasYield && this.match(tt.dot)) {
      const meta = this.createIdentifier(
        this.startNodeAtNode(node),
        "function",
      );
      this.next(); // eat `.`
      // https://github.com/tc39/proposal-function.sent#syntax-1
      if (this.match(tt._sent)) {
        this.expectPlugin("functionSent");
      } else if (!this.hasPlugin("functionSent")) {
        // The code wasn't `function.sent` but just `function.`, so a simple error is less confusing.
        this.unexpected();
      }
      return this.parseMetaProperty(node, meta, "sent");
    }
    return this.parseFunction(node);
  }

  parseMetaProperty(
    node: N.MetaProperty,
    meta: N.Identifier,
    propertyName: string,
  ): N.MetaProperty {
    node.meta = meta;

    const containsEsc = this.state.containsEsc;

    node.property = this.parseIdentifier(true);

    if (node.property.name !== propertyName || containsEsc) {
      this.raise(
        node.property.start,
        Errors.UnsupportedMetaProperty,
        meta.name,
        propertyName,
      );
    }

    return this.finishNode(node, "MetaProperty");
  }

  // https://tc39.es/ecma262/#prod-ImportMeta
  parseImportMetaProperty(node: N.MetaProperty): N.MetaProperty {
    const id = this.createIdentifier(this.startNodeAtNode(node), "import");
    this.next(); // eat `.`

    if (this.isContextual(tt._meta)) {
      if (!this.inModule) {
        this.raise(id.start, SourceTypeModuleErrors.ImportMetaOutsideModule);
      }
      this.sawUnambiguousESM = true;
    }

    return this.parseMetaProperty(node, id, "meta");
  }

  parseLiteralAtNode<T: N.Node>(
    value: any,
    type: $ElementType<T, "type">,
    node: any,
  ): T {
    this.addExtra(node, "rawValue", value);
    this.addExtra(node, "raw", this.input.slice(node.start, this.state.end));
    node.value = value;
    this.next();
    return this.finishNode<T>(node, type);
  }

  parseLiteral<T: N.Node>(value: any, type: $ElementType<T, "type">): T {
    const node = this.startNode();
    return this.parseLiteralAtNode(value, type, node);
  }

  parseStringLiteral(value: any) {
    return this.parseLiteral<N.StringLiteral>(value, "StringLiteral");
  }

  parseNumericLiteral(value: any) {
    return this.parseLiteral<N.NumericLiteral>(value, "NumericLiteral");
  }

  parseBigIntLiteral(value: any) {
    return this.parseLiteral<N.BigIntLiteral>(value, "BigIntLiteral");
  }

  parseDecimalLiteral(value: any) {
    return this.parseLiteral<N.DecimalLiteral>(value, "DecimalLiteral");
  }

  parseRegExpLiteral(value: { value: any, pattern: string, flags: string }) {
    const node = this.parseLiteral<N.RegExpLiteral>(
      value.value,
      "RegExpLiteral",
    );
    node.pattern = value.pattern;
    node.flags = value.flags;
    return node;
  }

  parseBooleanLiteral(value: boolean) {
    const node = this.startNode();
    node.value = value;
    this.next();
    return this.finishNode<N.BooleanLiteral>(node, "BooleanLiteral");
  }

  parseNullLiteral() {
    const node = this.startNode();
    this.next();
    return this.finishNode<N.NullLiteral>(node, "NullLiteral");
  }

  // https://tc39.es/ecma262/#prod-CoverParenthesizedExpressionAndArrowParameterList
  parseParenAndDistinguishExpression(canBeArrow: boolean): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;

    let val;
    this.next(); // eat `(`
    this.expressionScope.enter(newArrowHeadScope());

    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.maybeInArrowParameters = true;
    this.state.inFSharpPipelineDirectBody = false;

    const innerStartPos = this.state.start;
    const innerStartLoc = this.state.startLoc;
    const exprList = [];
    const refExpressionErrors = new ExpressionErrors();
    let first = true;
    let spreadStart;
    let optionalCommaStart;

    while (!this.match(tt.parenR)) {
      if (first) {
        first = false;
      } else {
        this.expect(
          tt.comma,
          refExpressionErrors.optionalParameters === -1
            ? null
            : refExpressionErrors.optionalParameters,
        );
        if (this.match(tt.parenR)) {
          optionalCommaStart = this.state.start;
          break;
        }
      }

      if (this.match(tt.ellipsis)) {
        const spreadNodeStartPos = this.state.start;
        const spreadNodeStartLoc = this.state.startLoc;
        spreadStart = this.state.start;
        exprList.push(
          this.parseParenItem(
            this.parseRestBinding(),
            spreadNodeStartPos,
            spreadNodeStartLoc,
          ),
        );

        this.checkCommaAfterRest(charCodes.rightParenthesis);

        break;
      } else {
        exprList.push(
          this.parseMaybeAssignAllowIn(
            refExpressionErrors,
            this.parseParenItem,
          ),
        );
      }
    }

    const innerEndPos = this.state.lastTokEnd;
    const innerEndLoc = this.state.lastTokEndLoc;
    this.expect(tt.parenR);

    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;

    let arrowNode = this.startNodeAt(startPos, startLoc);
    if (
      canBeArrow &&
      this.shouldParseArrow(exprList) &&
      (arrowNode = this.parseArrow(arrowNode))
    ) {
      this.expressionScope.validateAsPattern();
      this.expressionScope.exit();
      this.parseArrowExpression(arrowNode, exprList, false);
      return arrowNode;
    }
    this.expressionScope.exit();

    if (!exprList.length) {
      this.unexpected(this.state.lastTokStart);
    }
    if (optionalCommaStart) this.unexpected(optionalCommaStart);
    if (spreadStart) this.unexpected(spreadStart);
    this.checkExpressionErrors(refExpressionErrors, true);

    this.toReferencedListDeep(exprList, /* isParenthesizedExpr */ true);
    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      // finish node at current location so it can pick up comments after `)`
      this.finishNode(val, "SequenceExpression");
      this.resetEndLocation(val, innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }

    if (!this.options.createParenthesizedExpressions) {
      this.addExtra(val, "parenthesized", true);
      this.addExtra(val, "parenStart", startPos);

      this.takeSurroundingComments(val, startPos, this.state.lastTokEnd);

      return val;
    }

    const parenExpression = this.startNodeAt(startPos, startLoc);
    parenExpression.expression = val;
    this.finishNode(parenExpression, "ParenthesizedExpression");
    return parenExpression;
  }

  // eslint-disable-next-line no-unused-vars -- `params` is used in typescript plugin
  shouldParseArrow(params: Array<N.Node>): boolean {
    return !this.canInsertSemicolon();
  }

  parseArrow(node: N.ArrowFunctionExpression): ?N.ArrowFunctionExpression {
    if (this.eat(tt.arrow)) {
      return node;
    }
  }

  parseParenItem(
    node: N.Expression,
    startPos: number, // eslint-disable-line no-unused-vars
    startLoc: Position, // eslint-disable-line no-unused-vars
  ): N.Expression {
    return node;
  }

  parseNewOrNewTarget(): N.NewExpression | N.MetaProperty {
    const node = this.startNode();
    this.next();
    if (this.match(tt.dot)) {
      // https://tc39.es/ecma262/#prod-NewTarget
      const meta = this.createIdentifier(this.startNodeAtNode(node), "new");
      this.next();
      const metaProp = this.parseMetaProperty(node, meta, "target");

      if (!this.scope.inNonArrowFunction && !this.scope.inClass) {
        this.raise(metaProp.start, Errors.UnexpectedNewTarget);
      }

      return metaProp;
    }

    return this.parseNew(node);
  }

  // New's precedence is slightly tricky. It must allow its argument to
  // be a `[]` or dot subscript expression, but not a call — at least,
  // not without wrapping it in parentheses. Thus, it uses the noCalls
  // argument to parseSubscripts to prevent it from consuming the
  // argument list.
  // https://tc39.es/ecma262/#prod-NewExpression
  parseNew(node: N.Expression): N.NewExpression {
    node.callee = this.parseNoCallExpr();
    if (node.callee.type === "Import") {
      this.raise(node.callee.start, Errors.ImportCallNotNewExpression);
    } else if (this.isOptionalChain(node.callee)) {
      this.raise(this.state.lastTokEnd, Errors.OptionalChainingNoNew);
    } else if (this.eat(tt.questionDot)) {
      this.raise(this.state.start, Errors.OptionalChainingNoNew);
    }

    this.parseNewArguments(node);
    return this.finishNode(node, "NewExpression");
  }

  parseNewArguments(node: N.NewExpression): void {
    if (this.eat(tt.parenL)) {
      const args = this.parseExprList(tt.parenR);
      this.toReferencedList(args);
      // $FlowFixMe (parseExprList should be all non-null in this case)
      node.arguments = args;
    } else {
      node.arguments = [];
    }
  }

  // Parse template expression.

  parseTemplateElement(isTagged: boolean): N.TemplateElement {
    const elem = this.startNode();
    if (this.state.value === null) {
      if (!isTagged) {
        this.raise(this.state.start + 1, Errors.InvalidEscapeSequenceTemplate);
      }
    }
    elem.value = {
      raw: this.input
        .slice(this.state.start, this.state.end)
        .replace(/\r\n?/g, "\n"),
      cooked: this.state.value,
    };
    this.next();
    elem.tail = this.match(tt.backQuote);
    return this.finishNode(elem, "TemplateElement");
  }

  // https://tc39.es/ecma262/#prod-TemplateLiteral
  parseTemplate(isTagged: boolean): N.TemplateLiteral {
    const node = this.startNode();
    this.next();
    node.expressions = [];
    let curElt = this.parseTemplateElement(isTagged);
    node.quasis = [curElt];
    while (!curElt.tail) {
      this.expect(tt.dollarBraceL);
      node.expressions.push(this.parseTemplateSubstitution());
      this.expect(tt.braceR);
      node.quasis.push((curElt = this.parseTemplateElement(isTagged)));
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  }

  // This is overwritten by the TypeScript plugin to parse template types
  parseTemplateSubstitution(): N.Expression {
    return this.parseExpression();
  }

  // Parse an object literal, binding pattern, or record.

  parseObjectLike<T: N.ObjectPattern | N.ObjectExpression>(
    close: TokenType,
    isPattern: boolean,
    isRecord?: ?boolean,
    refExpressionErrors?: ?ExpressionErrors,
  ): T {
    if (isRecord) {
      this.expectPlugin("recordAndTuple");
    }
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = false;
    const propHash: any = Object.create(null);
    let first = true;
    const node = this.startNode();

    node.properties = [];
    this.next();

    while (!this.match(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.match(close)) {
          this.addExtra(node, "trailingComma", this.state.lastTokStart);
          break;
        }
      }

      let prop;
      if (isPattern) {
        prop = this.parseBindingProperty();
      } else {
        prop = this.parsePropertyDefinition(refExpressionErrors);
        this.checkProto(prop, isRecord, propHash, refExpressionErrors);
      }

      if (
        isRecord &&
        !this.isObjectProperty(prop) &&
        prop.type !== "SpreadElement"
      ) {
        this.raise(prop.start, Errors.InvalidRecordProperty);
      }

      // $FlowIgnore
      if (prop.shorthand) {
        this.addExtra(prop, "shorthand", true);
      }

      node.properties.push(prop);
    }

    this.next();

    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
    let type = "ObjectExpression";
    if (isPattern) {
      type = "ObjectPattern";
    } else if (isRecord) {
      type = "RecordExpression";
    }
    return this.finishNode(node, type);
  }

  // Check grammar production:
  //   IdentifierName *_opt PropertyName
  // It is used in `parsePropertyDefinition` to detect AsyncMethod and Accessors
  maybeAsyncOrAccessorProp(prop: N.ObjectProperty): boolean {
    return (
      !prop.computed &&
      prop.key.type === "Identifier" &&
      (this.isLiteralPropertyName() ||
        this.match(tt.bracketL) ||
        this.match(tt.star))
    );
  }

  // https://tc39.es/ecma262/#prod-PropertyDefinition
  parsePropertyDefinition(
    refExpressionErrors?: ?ExpressionErrors,
  ): N.ObjectMember | N.SpreadElement {
    let decorators = [];
    if (this.match(tt.at)) {
      if (this.hasPlugin("decorators")) {
        this.raise(this.state.start, Errors.UnsupportedPropertyDecorator);
      }

      // we needn't check if decorators (stage 0) plugin is enabled since it's checked by
      // the call to this.parseDecorator
      while (this.match(tt.at)) {
        decorators.push(this.parseDecorator());
      }
    }

    const prop = this.startNode();
    let isAsync = false;
    let isAccessor = false;
    let startPos;
    let startLoc;

    if (this.match(tt.ellipsis)) {
      if (decorators.length) this.unexpected();
      return this.parseSpread();
    }

    if (decorators.length) {
      prop.decorators = decorators;
      decorators = [];
    }

    prop.method = false;

    if (refExpressionErrors) {
      startPos = this.state.start;
      startLoc = this.state.startLoc;
    }

    let isGenerator = this.eat(tt.star);
    this.parsePropertyNamePrefixOperator(prop);
    const containsEsc = this.state.containsEsc;
    const key = this.parsePropertyName(prop);

    if (!isGenerator && !containsEsc && this.maybeAsyncOrAccessorProp(prop)) {
      const keyName = key.name;
      // https://tc39.es/ecma262/#prod-AsyncMethod
      // https://tc39.es/ecma262/#prod-AsyncGeneratorMethod
      if (keyName === "async" && !this.hasPrecedingLineBreak()) {
        isAsync = true;
        this.resetPreviousNodeTrailingComments(key);
        isGenerator = this.eat(tt.star);
        this.parsePropertyName(prop);
      }
      // get PropertyName[?Yield, ?Await] () { FunctionBody[~Yield, ~Await] }
      // set PropertyName[?Yield, ?Await] ( PropertySetParameterList ) { FunctionBody[~Yield, ~Await] }
      if (keyName === "get" || keyName === "set") {
        isAccessor = true;
        this.resetPreviousNodeTrailingComments(key);
        prop.kind = keyName;
        if (this.match(tt.star)) {
          isGenerator = true;
          this.raise(this.state.pos, Errors.AccessorIsGenerator, keyName);
          this.next();
        }
        this.parsePropertyName(prop);
      }
    }

    this.parseObjPropValue(
      prop,
      startPos,
      startLoc,
      isGenerator,
      isAsync,
      false /* isPattern */,
      isAccessor,
      refExpressionErrors,
    );

    return prop;
  }

  getGetterSetterExpectedParamCount(
    method: N.ObjectMethod | N.ClassMethod,
  ): number {
    return method.kind === "get" ? 0 : 1;
  }

  // This exists so we can override within the ESTree plugin
  getObjectOrClassMethodParams(method: N.ObjectMethod | N.ClassMethod) {
    return method.params;
  }

  // get methods aren't allowed to have any parameters
  // set methods must have exactly 1 parameter which is not a rest parameter
  checkGetterSetterParams(method: N.ObjectMethod | N.ClassMethod): void {
    const paramCount = this.getGetterSetterExpectedParamCount(method);
    const params = this.getObjectOrClassMethodParams(method);

    const start = method.start;

    if (params.length !== paramCount) {
      if (method.kind === "get") {
        this.raise(start, Errors.BadGetterArity);
      } else {
        this.raise(start, Errors.BadSetterArity);
      }
    }

    if (
      method.kind === "set" &&
      params[params.length - 1]?.type === "RestElement"
    ) {
      this.raise(start, Errors.BadSetterRestParameter);
    }
  }

  // https://tc39.es/ecma262/#prod-MethodDefinition
  parseObjectMethod(
    prop: N.ObjectMethod,
    isGenerator: boolean,
    isAsync: boolean,
    isPattern: boolean,
    isAccessor: boolean,
  ): ?N.ObjectMethod {
    if (isAccessor) {
      // isAccessor implies isAsync: false, isPattern: false, isGenerator: false
      this.parseMethod(
        prop,
        // This _should_ be false, but with error recovery, we allow it to be
        // set for informational purposes
        isGenerator,
        /* isAsync */ false,
        /* isConstructor */ false,
        false,
        "ObjectMethod",
      );
      this.checkGetterSetterParams(prop);
      return prop;
    }

    if (isAsync || isGenerator || this.match(tt.parenL)) {
      if (isPattern) this.unexpected();
      prop.kind = "method";
      prop.method = true;
      return this.parseMethod(
        prop,
        isGenerator,
        isAsync,
        /* isConstructor */ false,
        false,
        "ObjectMethod",
      );
    }
  }

  // if `isPattern` is true, parse https://tc39.es/ecma262/#prod-BindingProperty
  // else https://tc39.es/ecma262/#prod-PropertyDefinition
  parseObjectProperty(
    prop: N.ObjectProperty,
    startPos: ?number,
    startLoc: ?Position,
    isPattern: boolean,
    refExpressionErrors: ?ExpressionErrors,
  ): ?N.ObjectProperty {
    prop.shorthand = false;

    if (this.eat(tt.colon)) {
      prop.value = isPattern
        ? this.parseMaybeDefault(this.state.start, this.state.startLoc)
        : this.parseMaybeAssignAllowIn(refExpressionErrors);

      return this.finishNode(prop, "ObjectProperty");
    }

    if (!prop.computed && prop.key.type === "Identifier") {
      // PropertyDefinition:
      //   IdentifierReference
      //   CoverInitializedName
      // Note: `{ eval } = {}` will be checked in `checkLVal` later.
      this.checkReservedWord(prop.key.name, prop.key.start, true, false);

      if (isPattern) {
        prop.value = this.parseMaybeDefault(
          startPos,
          startLoc,
          cloneIdentifier(prop.key),
        );
      } else if (this.match(tt.eq)) {
        const shorthandAssign = this.state.start;
        if (refExpressionErrors != null) {
          if (refExpressionErrors.shorthandAssign === -1) {
            refExpressionErrors.shorthandAssign = shorthandAssign;
          }
        } else {
          this.raise(shorthandAssign, Errors.InvalidCoverInitializedName);
        }
        prop.value = this.parseMaybeDefault(
          startPos,
          startLoc,
          cloneIdentifier(prop.key),
        );
      } else {
        prop.value = cloneIdentifier(prop.key);
      }
      prop.shorthand = true;

      return this.finishNode(prop, "ObjectProperty");
    }
  }

  parseObjPropValue(
    prop: any,
    startPos: ?number,
    startLoc: ?Position,
    isGenerator: boolean,
    isAsync: boolean,
    isPattern: boolean,
    isAccessor: boolean,
    refExpressionErrors?: ?ExpressionErrors,
  ): void {
    const node =
      this.parseObjectMethod(
        prop,
        isGenerator,
        isAsync,
        isPattern,
        isAccessor,
      ) ||
      this.parseObjectProperty(
        prop,
        startPos,
        startLoc,
        isPattern,
        refExpressionErrors,
      );

    if (!node) this.unexpected();

    // $FlowFixMe
    return node;
  }

  parsePropertyName(
    prop: N.ObjectOrClassMember | N.ClassMember | N.TsNamedTypeElementBase,
  ): N.Expression | N.Identifier {
    if (this.eat(tt.bracketL)) {
      (prop: $FlowSubtype<N.ObjectOrClassMember>).computed = true;
      prop.key = this.parseMaybeAssignAllowIn();
      this.expect(tt.bracketR);
    } else {
      // We check if it's valid for it to be a private name when we push it.
      const { type, value } = this.state;
      let key;
      // most un-computed property names are identifiers
      if (tokenIsKeywordOrIdentifier(type)) {
        key = this.parseIdentifier(true);
      } else {
        switch (type) {
          case tt.num:
            key = this.parseNumericLiteral(value);
            break;
          case tt.string:
            key = this.parseStringLiteral(value);
            break;
          case tt.bigint:
            key = this.parseBigIntLiteral(value);
            break;
          case tt.decimal:
            key = this.parseDecimalLiteral(value);
            break;
          case tt.privateName: {
            // the class private key has been handled in parseClassElementName
            const privateKeyPos = this.state.start + 1;
            this.raise(privateKeyPos, Errors.UnexpectedPrivateField);
            key = this.parsePrivateName();
            break;
          }
          default:
            throw this.unexpected();
        }
      }
      (prop: $FlowFixMe).key = key;
      if (type !== tt.privateName) {
        // ClassPrivateProperty is never computed, so we don't assign in that case.
        prop.computed = false;
      }
    }

    return prop.key;
  }

  // Initialize empty function node.

  initFunction(node: N.BodilessFunctionOrMethodBase, isAsync: ?boolean): void {
    node.id = null;
    node.generator = false;
    node.async = !!isAsync;
  }

  // Parse object or class method.

  parseMethod<T: N.MethodLike>(
    node: T,
    isGenerator: boolean,
    isAsync: boolean,
    isConstructor: boolean,
    allowDirectSuper: boolean,
    type: string,
    inClassScope: boolean = false,
  ): T {
    this.initFunction(node, isAsync);
    node.generator = !!isGenerator;
    const allowModifiers = isConstructor; // For TypeScript parameter properties
    this.scope.enter(
      SCOPE_FUNCTION |
        SCOPE_SUPER |
        (inClassScope ? SCOPE_CLASS : 0) |
        (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0),
    );
    this.prodParam.enter(functionFlags(isAsync, node.generator));
    this.parseFunctionParams((node: any), allowModifiers);
    this.parseFunctionBodyAndFinish(node, type, true);
    this.prodParam.exit();
    this.scope.exit();

    return node;
  }

  // parse an array literal or tuple literal
  // https://tc39.es/ecma262/#prod-ArrayLiteral
  // https://tc39.es/proposal-record-tuple/#prod-TupleLiteral
  parseArrayLike(
    close: TokenType,
    canBePattern: boolean,
    isTuple: boolean,
    refExpressionErrors: ?ExpressionErrors,
  ): N.ArrayExpression | N.TupleExpression {
    if (isTuple) {
      this.expectPlugin("recordAndTuple");
    }
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = false;
    const node = this.startNode();
    this.next();
    node.elements = this.parseExprList(
      close,
      /* allowEmpty */ !isTuple,
      refExpressionErrors,
      node,
    );
    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
    return this.finishNode(
      node,
      isTuple ? "TupleExpression" : "ArrayExpression",
    );
  }

  // Parse arrow function expression.
  // If the parameters are provided, they will be converted to an
  // assignable list.
  parseArrowExpression(
    node: N.ArrowFunctionExpression,
    params: ?(N.Expression[]),
    isAsync: boolean,
    trailingCommaPos: ?number,
  ): N.ArrowFunctionExpression {
    this.scope.enter(SCOPE_FUNCTION | SCOPE_ARROW);
    let flags = functionFlags(isAsync, false);
    // ConciseBody and AsyncConciseBody inherit [In]
    if (!this.match(tt.bracketL) && this.prodParam.hasIn) {
      flags |= PARAM_IN;
    }
    this.prodParam.enter(flags);
    this.initFunction(node, isAsync);
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;

    if (params) {
      this.state.maybeInArrowParameters = true;
      this.setArrowFunctionParameters(node, params, trailingCommaPos);
    }
    this.state.maybeInArrowParameters = false;
    this.parseFunctionBody(node, true);

    this.prodParam.exit();
    this.scope.exit();
    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;

    return this.finishNode(node, "ArrowFunctionExpression");
  }

  setArrowFunctionParameters(
    node: N.ArrowFunctionExpression,
    params: N.Expression[],
    trailingCommaPos: ?number,
  ): void {
    node.params = this.toAssignableList(params, trailingCommaPos, false);
  }

  parseFunctionBodyAndFinish(
    node: N.BodilessFunctionOrMethodBase,
    type: string,
    isMethod?: boolean = false,
  ): void {
    // $FlowIgnore (node is not bodiless if we get here)
    this.parseFunctionBody(node, false, isMethod);
    this.finishNode(node, type);
  }

  // Parse function body and check parameters.
  parseFunctionBody(
    node: N.Function,
    allowExpression: ?boolean,
    isMethod?: boolean = false,
  ): void {
    const isExpression = allowExpression && !this.match(tt.braceL);
    this.expressionScope.enter(newExpressionScope());

    if (isExpression) {
      // https://tc39.es/ecma262/#prod-ExpressionBody
      node.body = this.parseMaybeAssign();
      this.checkParams(node, false, allowExpression, false);
    } else {
      const oldStrict = this.state.strict;
      // Start a new scope with regard to labels
      // flag (restore them to their old value afterwards).
      const oldLabels = this.state.labels;
      this.state.labels = [];

      // FunctionBody[Yield, Await]:
      //   StatementList[?Yield, ?Await, +Return] opt
      this.prodParam.enter(this.prodParam.currentFlags() | PARAM_RETURN);
      node.body = this.parseBlock(
        true,
        false,
        // Strict mode function checks after we parse the statements in the function body.
        (hasStrictModeDirective: boolean) => {
          const nonSimple = !this.isSimpleParamList(node.params);

          if (hasStrictModeDirective && nonSimple) {
            // This logic is here to align the error location with the ESTree plugin.
            const errorPos =
              // $FlowIgnore
              (node.kind === "method" || node.kind === "constructor") &&
              // $FlowIgnore
              !!node.key
                ? node.key.end
                : node.start;
            this.raise(errorPos, Errors.IllegalLanguageModeDirective);
          }

          const strictModeChanged = !oldStrict && this.state.strict;

          // Add the params to varDeclaredNames to ensure that an error is thrown
          // if a let/const declaration in the function clashes with one of the params.
          this.checkParams(
            node,
            !this.state.strict && !allowExpression && !isMethod && !nonSimple,
            allowExpression,
            strictModeChanged,
          );

          // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
          if (this.state.strict && node.id) {
            this.checkLVal(
              node.id,
              "function name",
              BIND_OUTSIDE,
              undefined,
              undefined,
              strictModeChanged,
            );
          }
        },
      );
      this.prodParam.exit();
      this.state.labels = oldLabels;
    }
    this.expressionScope.exit();
  }

  isSimpleParamList(
    params: $ReadOnlyArray<N.Pattern | N.TSParameterProperty>,
  ): boolean {
    for (let i = 0, len = params.length; i < len; i++) {
      if (params[i].type !== "Identifier") return false;
    }
    return true;
  }

  checkParams(
    node: N.Function,
    allowDuplicates: boolean,
    // eslint-disable-next-line no-unused-vars
    isArrowFunction: ?boolean,
    strictModeChanged?: boolean = true,
  ): void {
    const checkClashes = new Set();
    for (const param of node.params) {
      this.checkLVal(
        param,
        "function parameter list",
        BIND_VAR,
        allowDuplicates ? null : checkClashes,
        undefined,
        strictModeChanged,
      );
    }
  }

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  parseExprList(
    close: TokenType,
    allowEmpty?: boolean,
    refExpressionErrors?: ?ExpressionErrors,
    nodeForExtra?: ?N.Node,
  ): $ReadOnlyArray<?N.Expression> {
    const elts = [];
    let first = true;

    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.match(close)) {
          if (nodeForExtra) {
            this.addExtra(
              nodeForExtra,
              "trailingComma",
              this.state.lastTokStart,
            );
          }
          this.next();
          break;
        }
      }

      elts.push(this.parseExprListItem(allowEmpty, refExpressionErrors));
    }
    return elts;
  }

  parseExprListItem(
    allowEmpty: ?boolean,
    refExpressionErrors?: ?ExpressionErrors,
    allowPlaceholder: ?boolean,
  ): ?N.Expression {
    let elt;
    if (this.match(tt.comma)) {
      if (!allowEmpty) {
        this.raise(this.state.pos, Errors.UnexpectedToken, ",");
      }
      elt = null;
    } else if (this.match(tt.ellipsis)) {
      const spreadNodeStartPos = this.state.start;
      const spreadNodeStartLoc = this.state.startLoc;

      elt = this.parseParenItem(
        this.parseSpread(refExpressionErrors),
        spreadNodeStartPos,
        spreadNodeStartLoc,
      );
    } else if (this.match(tt.question)) {
      this.expectPlugin("partialApplication");
      if (!allowPlaceholder) {
        this.raise(this.state.start, Errors.UnexpectedArgumentPlaceholder);
      }
      const node = this.startNode();
      this.next();
      elt = this.finishNode(node, "ArgumentPlaceholder");
    } else {
      elt = this.parseMaybeAssignAllowIn(
        refExpressionErrors,
        this.parseParenItem,
      );
    }
    return elt;
  }

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.
  // This shouldn't be used to parse the keywords of meta properties, since they
  // are not identifiers and cannot contain escape sequences.

  parseIdentifier(liberal?: boolean): N.Identifier {
    const node = this.startNode();
    const name = this.parseIdentifierName(node.start, liberal);

    return this.createIdentifier(node, name);
  }

  createIdentifier(node: N.Identifier, name: string): N.Identifier {
    node.name = name;
    node.loc.identifierName = name;

    return this.finishNode(node, "Identifier");
  }

  parseIdentifierName(pos: number, liberal?: boolean): string {
    let name: string;

    const { start, type } = this.state;

    if (tokenIsKeywordOrIdentifier(type)) {
      name = this.state.value;
    } else {
      throw this.unexpected();
    }

    const tokenIsKeyword = tokenKeywordOrIdentifierIsKeyword(type);

    if (liberal) {
      // If the current token is not used as a keyword, set its type to "tt.name".
      // This will prevent this.next() from throwing about unexpected escapes.
      if (tokenIsKeyword) {
        this.replaceToken(tt.name);
      }
    } else {
      this.checkReservedWord(name, start, tokenIsKeyword, false);
    }

    this.next();

    return name;
  }

  checkReservedWord(
    word: string,
    startLoc: number,
    checkKeywords: boolean,
    isBinding: boolean,
  ): void {
    // Every JavaScript reserved word is 10 characters or less.
    if (word.length > 10) {
      return;
    }
    // Most identifiers are not reservedWord-like, they don't need special
    // treatments afterward, which very likely ends up throwing errors
    if (!canBeReservedWord(word)) {
      return;
    }

    if (word === "yield") {
      if (this.prodParam.hasYield) {
        this.raise(startLoc, Errors.YieldBindingIdentifier);
        return;
      }
    } else if (word === "await") {
      if (this.prodParam.hasAwait) {
        this.raise(startLoc, Errors.AwaitBindingIdentifier);
        return;
      } else if (this.scope.inStaticBlock) {
        this.raise(startLoc, Errors.AwaitBindingIdentifierInStaticBlock);
        return;
      } else {
        this.expressionScope.recordAsyncArrowParametersError(
          startLoc,
          Errors.AwaitBindingIdentifier,
        );
      }
    } else if (word === "arguments") {
      if (this.scope.inClassAndNotInNonArrowFunction) {
        this.raise(startLoc, Errors.ArgumentsInClass);
        return;
      }
    }

    if (checkKeywords && isKeyword(word)) {
      this.raise(startLoc, Errors.UnexpectedKeyword, word);
      return;
    }

    const reservedTest = !this.state.strict
      ? isReservedWord
      : isBinding
      ? isStrictBindReservedWord
      : isStrictReservedWord;

    if (reservedTest(word, this.inModule)) {
      this.raise(startLoc, Errors.UnexpectedReservedWord, word);
    }
  }

  isAwaitAllowed(): boolean {
    if (this.prodParam.hasAwait) return true;
    if (this.options.allowAwaitOutsideFunction && !this.scope.inFunction) {
      return true;
    }
    return false;
  }

  // Parses await expression inside async function.

  parseAwait(startPos: number, startLoc: Position): N.AwaitExpression {
    const node = this.startNodeAt(startPos, startLoc);

    this.expressionScope.recordParameterInitializerError(
      node.start,
      Errors.AwaitExpressionFormalParameter,
    );

    if (this.eat(tt.star)) {
      this.raise(node.start, Errors.ObsoleteAwaitStar);
    }

    if (!this.scope.inFunction && !this.options.allowAwaitOutsideFunction) {
      if (this.isAmbiguousAwait()) {
        this.ambiguousScriptDifferentAst = true;
      } else {
        this.sawUnambiguousESM = true;
      }
    }

    if (!this.state.soloAwait) {
      node.argument = this.parseMaybeUnary(null, true);
    }

    return this.finishNode(node, "AwaitExpression");
  }

  isAmbiguousAwait(): boolean {
    return (
      this.hasPrecedingLineBreak() ||
      // All the following expressions are ambiguous:
      //   await + 0, await - 0, await ( 0 ), await [ 0 ], await / 0 /u, await ``
      this.match(tt.plusMin) ||
      this.match(tt.parenL) ||
      this.match(tt.bracketL) ||
      this.match(tt.backQuote) ||
      // Sometimes the tokenizer generates tt.slash for regexps, and this is
      // handler by parseExprAtom
      this.match(tt.regexp) ||
      this.match(tt.slash) ||
      // This code could be parsed both as a modulo operator or as an intrinsic:
      //   await %x(0)
      (this.hasPlugin("v8intrinsic") && this.match(tt.modulo))
    );
  }

  // Parses yield expression inside generator.

  parseYield(): N.YieldExpression {
    const node = this.startNode();

    this.expressionScope.recordParameterInitializerError(
      node.start,
      Errors.YieldInParameter,
    );

    this.next();
    let delegating = false;
    let argument = null;
    if (!this.hasPrecedingLineBreak()) {
      delegating = this.eat(tt.star);
      switch (this.state.type) {
        case tt.semi:
        case tt.eof:
        case tt.braceR:
        case tt.parenR:
        case tt.bracketR:
        case tt.braceBarR:
        case tt.colon:
        case tt.comma:
          // The above is the complete set of tokens that can
          // follow an AssignmentExpression, and none of them
          // can start an AssignmentExpression
          if (!delegating) break;
        /* fallthrough */
        default:
          argument = this.parseMaybeAssign();
      }
    }
    node.delegate = delegating;
    node.argument = argument;
    return this.finishNode(node, "YieldExpression");
  }

  // Validates a pipeline (for any of the pipeline Babylon plugins) at the point
  // of the infix operator `|>`.

  checkPipelineAtInfixOperator(left: N.Expression, leftStartPos: number) {
    if (this.getPluginOption("pipelineOperator", "proposal") === "smart") {
      if (left.type === "SequenceExpression") {
        // Ensure that the pipeline head is not a comma-delimited
        // sequence expression.
        this.raise(leftStartPos, Errors.PipelineHeadSequenceExpression);
      }
    }
  }

  // This helper method is to be called immediately
  // after a Hack-style pipe body is parsed.
  // The `startPos` is the starting position of the pipe body.

  checkHackPipeBodyEarlyErrors(startPos: number): void {
    if (!this.topicReferenceWasUsedInCurrentContext()) {
      // A Hack pipe body must use the topic reference at least once.
      this.raise(startPos, Errors.PipeTopicUnused);
    }
  }

  parseSmartPipelineBodyInStyle(
    childExpr: N.Expression,
    startPos: number,
    startLoc: Position,
  ): N.PipelineBody {
    const bodyNode = this.startNodeAt(startPos, startLoc);
    if (this.isSimpleReference(childExpr)) {
      bodyNode.callee = childExpr;
      return this.finishNode(bodyNode, "PipelineBareFunction");
    } else {
      this.checkSmartPipeTopicBodyEarlyErrors(startPos);
      bodyNode.expression = childExpr;
      return this.finishNode(bodyNode, "PipelineTopicExpression");
    }
  }

  isSimpleReference(expression: N.Expression): boolean {
    switch (expression.type) {
      case "MemberExpression":
        return (
          !expression.computed && this.isSimpleReference(expression.object)
        );
      case "Identifier":
        return true;
      default:
        return false;
    }
  }

  // This helper method is to be called immediately
  // after a topic-style smart-mix pipe body is parsed.
  // The `startPos` is the starting position of the pipe body.

  checkSmartPipeTopicBodyEarlyErrors(startPos: number): void {
    // If the following token is invalidly `=>`, then throw a human-friendly error
    // instead of something like 'Unexpected token, expected ";"'.
    // For example, `x => x |> y => #` (assuming `#` is the topic reference)
    // groups into `x => (x |> y) => #`,
    // and `(x |> y) => #` is an invalid arrow function.
    // This is because smart-mix `|>` has tighter precedence than `=>`.
    if (this.match(tt.arrow)) {
      throw this.raise(this.state.start, Errors.PipelineBodyNoArrow);
    }

    // A topic-style smart-mix pipe body must use the topic reference at least once.
    else if (!this.topicReferenceWasUsedInCurrentContext()) {
      this.raise(startPos, Errors.PipelineTopicUnused);
    }
  }

  // Enable topic references from outer contexts within Hack-style pipe bodies.
  // The function modifies the parser's topic-context state to enable or disable
  // the use of topic references.
  // The function then calls a callback, then resets the parser
  // to the old topic-context state that it had before the function was called.

  withTopicBindingContext<T>(callback: () => T): T {
    const outerContextTopicState = this.state.topicContext;
    this.state.topicContext = {
      // Enable the use of the primary topic reference.
      maxNumOfResolvableTopics: 1,
      // Hide the use of any topic references from outer contexts.
      maxTopicIndex: null,
    };

    try {
      return callback();
    } finally {
      this.state.topicContext = outerContextTopicState;
    }
  }

  // This helper method is used only with the deprecated smart-mix pipe proposal.
  // Disables topic references from outer contexts within syntax constructs
  // such as the bodies of iteration statements.
  // The function modifies the parser's topic-context state to enable or disable
  // the use of topic references with the smartPipelines plugin. They then run a
  // callback, then they reset the parser to the old topic-context state that it
  // had before the function was called.

  withSmartMixTopicForbiddingContext<T>(callback: () => T): T {
    const proposal = this.getPluginOption("pipelineOperator", "proposal");
    if (proposal === "smart") {
      // Reset the parser’s topic context only if the smart-mix pipe proposal is active.
      const outerContextTopicState = this.state.topicContext;
      this.state.topicContext = {
        // Disable the use of the primary topic reference.
        maxNumOfResolvableTopics: 0,
        // Hide the use of any topic references from outer contexts.
        maxTopicIndex: null,
      };

      try {
        return callback();
      } finally {
        this.state.topicContext = outerContextTopicState;
      }
    } else {
      // If the pipe proposal is "minimal", "fsharp", or "hack",
      // or if no pipe proposal is active,
      // then the callback result is returned
      // without touching any extra parser state.
      return callback();
    }
  }

  withSoloAwaitPermittingContext<T>(callback: () => T): T {
    const outerContextSoloAwaitState = this.state.soloAwait;
    this.state.soloAwait = true;

    try {
      return callback();
    } finally {
      this.state.soloAwait = outerContextSoloAwaitState;
    }
  }

  allowInAnd<T>(callback: () => T): T {
    const flags = this.prodParam.currentFlags();
    const prodParamToSet = PARAM_IN & ~flags;
    if (prodParamToSet) {
      this.prodParam.enter(flags | PARAM_IN);
      try {
        return callback();
      } finally {
        this.prodParam.exit();
      }
    }
    return callback();
  }

  disallowInAnd<T>(callback: () => T): T {
    const flags = this.prodParam.currentFlags();
    const prodParamToClear = PARAM_IN & flags;
    if (prodParamToClear) {
      this.prodParam.enter(flags & ~PARAM_IN);
      try {
        return callback();
      } finally {
        this.prodParam.exit();
      }
    }
    return callback();
  }

  // Register the use of a topic reference within the current
  // topic-binding context.
  registerTopicReference(): void {
    this.state.topicContext.maxTopicIndex = 0;
  }

  topicReferenceIsAllowedInCurrentContext(): boolean {
    return this.state.topicContext.maxNumOfResolvableTopics >= 1;
  }

  topicReferenceWasUsedInCurrentContext(): boolean {
    return (
      this.state.topicContext.maxTopicIndex != null &&
      this.state.topicContext.maxTopicIndex >= 0
    );
  }

  parseFSharpPipelineBody(prec: number): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;

    this.state.potentialArrowAt = this.state.start;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = true;

    const ret = this.parseExprOp(
      this.parseMaybeUnaryOrPrivate(),
      startPos,
      startLoc,
      prec,
    );

    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;

    return ret;
  }

  // https://github.com/tc39/proposal-js-module-blocks
  parseModuleExpression(): N.ModuleExpression {
    this.expectPlugin("moduleBlocks");
    const node = this.startNode<N.ModuleExpression>();
    this.next(); // eat "module"
    this.eat(tt.braceL);

    const revertScopes = this.initializeScopes(/** inModule */ true);
    this.enterInitialScopes();

    const program = this.startNode<N.Program>();
    try {
      node.body = this.parseProgram(program, tt.braceR, "module");
    } finally {
      revertScopes();
    }
    this.eat(tt.braceR);
    return this.finishNode<N.ModuleExpression>(node, "ModuleExpression");
  }

  // Used in Flow plugin
  parsePropertyNamePrefixOperator(
    // eslint-disable-next-line no-unused-vars
    prop: N.ObjectOrClassMember | N.ClassMember,
  ): void {}
}
