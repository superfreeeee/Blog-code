/**
 * 为 options 创建 id(按值特征)
 * @param options
 * @returns
 */
export function optionsToId(options: IntersectionObserverInit) {
  return Object.keys(options)
    .sort()
    .filter((key) => options[key] !== undefined)
    .map((key) => {
      return `${key}_${key === 'root' ? getRootId(options.root) : options[key]}`;
    })
    .toString();
}
