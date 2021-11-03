const RootIds: WeakMap<Element | Document, string> = new WeakMap();
let rootId = 0;

/**
 * 为 root 元素创建唯一 id 并缓存
 * @param root 
 * @returns 
 */
function getRootId(root: IntersectionObserverInit['root']) {
  if (!root) return '0';
  if (RootIds.has(root)) return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}
