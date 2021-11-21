// @flow

import type Parser from './index';
import UtilParser from './util';
import { SourceLocation, type Position } from '../util/location';
import type { Comment, Node as NodeType, NodeBase } from '../types';

// Start an AST node, attaching a start offset.

/**
 * 节点基类型
 *   实现 NodeBase
 */
// ? Read
class Node implements NodeBase {
  /**
   * 节点初始化
   *   start、end、loc
   *   range、loc.filename
   *
   * @param {*} parser
   * @param {*} pos
   * @param {*} loc
   */
  constructor(parser: Parser, pos: number, loc: Position) {
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if (parser?.options.ranges) this.range = [pos, 0];
    if (parser?.filename) this.loc.filename = parser.filename;
  }

  type: string = '';
  declare start: number;
  declare end: number;
  declare loc: SourceLocation;
  declare range: [number, number];
  declare leadingComments: Array<Comment>;
  declare trailingComments: Array<Comment>;
  declare innerComments: Array<Comment>;
  declare extra: { [key: string]: any };
}
const NodePrototype = Node.prototype;

if (!process.env.BABEL_8_BREAKING) {
  // $FlowIgnore
  /**
   * Node.prototype.__clone 方法注入
   * @returns
   */
  NodePrototype.__clone = function (): Node {
    // $FlowIgnore
    const newNode: any = new Node();
    const keys = Object.keys(this);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      // Do not clone comments that are already attached to the node
      if (
        key !== 'leadingComments' &&
        key !== 'trailingComments' &&
        key !== 'innerComments'
      ) {
        newNode[key] = this[key];
      }
    }

    return newNode;
  };
}

function clonePlaceholder(node: any): any {
  return cloneIdentifier(node);
}

export function cloneIdentifier(node: any): any {
  // We don't need to clone `typeAnnotations` and `optional`: because
  // cloneIdentifier is only used in object shorthand and named import/export.
  // Neither of them allow type annotations after the identifier or optional identifier
  const { type, start, end, loc, range, extra, name } = node;
  const cloned = Object.create(NodePrototype);
  cloned.type = type;
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  cloned.extra = extra;
  cloned.name = name;
  if (type === 'Placeholder') {
    cloned.expectedNode = node.expectedNode;
  }
  return cloned;
}

export function cloneStringLiteral(node: any): any {
  const { type, start, end, loc, range, extra } = node;
  if (type === 'Placeholder') {
    return clonePlaceholder(node);
  }
  const cloned = Object.create(NodePrototype);
  cloned.type = 'StringLiteral';
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  cloned.extra = extra;
  cloned.value = node.value;
  return cloned;
}

/**
 * Node 相关工具函数
 */
export class NodeUtils extends UtilParser {
  /**
   * 创建新的节点
   * @returns
   */
  // ? Read
  startNode<T: NodeType>(): T {
    // $FlowIgnore
    return new Node(this, this.state.start, this.state.startLoc);
  }

  startNodeAt<T: NodeType>(pos: number, loc: Position): T {
    // $FlowIgnore
    return new Node(this, pos, loc);
  }

  /** Start a new node with a previous node's location. */
  startNodeAtNode<T: NodeType>(type: NodeType): T {
    return this.startNodeAt(type.start, type.loc.start);
  }

  // Finish an AST node, adding `type` and `end` properties.

  finishNode<T: NodeType>(node: T, type: string): T {
    return this.finishNodeAt(
      node,
      type,
      this.state.lastTokEnd,
      this.state.lastTokEndLoc
    );
  }

  // Finish node at given position

  finishNodeAt<T: NodeType>(
    node: T,
    type: string,
    pos: number,
    loc: Position
  ): T {
    if (process.env.NODE_ENV !== 'production' && node.end > 0) {
      throw new Error(
        'Do not call finishNode*() twice on the same node.' +
          ' Instead use resetEndLocation() or change type directly.'
      );
    }
    node.type = type;
    node.end = pos;
    node.loc.end = loc;
    if (this.options.ranges) node.range[1] = pos;
    if (this.options.attachComment) this.processComment(node);
    return node;
  }

  resetStartLocation(node: NodeBase, start: number, startLoc: Position): void {
    node.start = start;
    node.loc.start = startLoc;
    if (this.options.ranges) node.range[0] = start;
  }

  resetEndLocation(
    node: NodeBase,
    end?: number = this.state.lastTokEnd,
    endLoc?: Position = this.state.lastTokEndLoc
  ): void {
    node.end = end;
    node.loc.end = endLoc;
    if (this.options.ranges) node.range[1] = end;
  }

  /**
   * Reset the start location of node to the start location of locationNode
   */
  resetStartLocationFromNode(node: NodeBase, locationNode: NodeBase): void {
    this.resetStartLocation(node, locationNode.start, locationNode.loc.start);
  }
}
