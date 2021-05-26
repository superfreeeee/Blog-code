/* 检查是否存在 key 属性 */
function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      // 测试用警告
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  // config.key -> 赋予元素的 key 属性
  return config.key !== undefined;
}