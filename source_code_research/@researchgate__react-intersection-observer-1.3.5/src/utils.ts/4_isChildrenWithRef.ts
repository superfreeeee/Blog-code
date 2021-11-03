/**
 * 判断子节点是否包含 ref 属性
 * @param children
 * @returns
 */
export function isChildrenWithRef<T>(children: unknown): children is React.RefAttributes<T> {
  return children && hasOwnProperty.call(children, 'ref');
}
