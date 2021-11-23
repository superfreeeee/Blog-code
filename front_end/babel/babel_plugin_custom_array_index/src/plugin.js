/**
 * 支持数组负数索引
 * @param {*} param0
 * @returns
 */
export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        /**
         * 满足形式
         * MemberExpression {
         *   object: Identifier | MemberExpression {},
         *   property: UnaryExpression {
         *     prefix: true,
         *     operator: '-',
         *     arguments: NumericLiteral {}
         *   }
         * }
         */
        const { object: obj, property: prop } = path.node || {};

        const isObjMatch =
          obj && (t.isIdentifier(obj) || t.isMemberExpression(obj));
        const isPropMatch = prop && t.isUnaryExpression(prop);

        if (!isObjMatch || !isPropMatch) {
          return;
        }

        const { prefix, operator, argument: arg } = prop;

        const isPropIndexMatch =
          prefix &&
          operator === '-' &&
          t.isNumericLiteral(arg) &&
          arg.value > 0;

        if (!isPropIndexMatch) {
          return;
        }

        /**
         * obj[prop]
         * 转换为
         * obj[obj.length - prop.arg.value]
         */
        // obj.length
        const len = t.memberExpression(obj, t.identifier('length'));
        // prop.value
        const val = t.numericLiteral(arg.value);
        // len - val
        const binExp = t.binaryExpression('-', len, val);
        // obj[obj.length - prop.value]
        const newNode = t.memberExpression(obj, binExp, true);

        path.replaceWith(newNode);
      },
    },
  };
}
