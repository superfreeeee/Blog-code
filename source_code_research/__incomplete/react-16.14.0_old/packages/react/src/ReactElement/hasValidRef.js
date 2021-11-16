/* 检查是否存在 ref 属性 */
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      // 测试时可能重复赋值，返回尚未添加警告的 ref
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  // 是否存在 config.ref，即元素上 ref 属性
  return config.ref !== undefined;
}