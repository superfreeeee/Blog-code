/* 获取元素名称 */
function getComponentName(type: mixed): string | null {
  // 1. 根元素、文本元素没有父元素 -> 没有 type
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  // 测试用：类型标签(type.tag)为数字时警告
  if (__DEV__) {
    if (typeof (type: any).tag === 'number') {
      console.error(
        'Received an unexpected object in getComponentName(). ' +
          'This is likely a bug in React. Please file an issue.',
      );
    }
  }

  // 2. 函数 -> 组件类型，返回元素名称(displayName, name, null)
  if (typeof type === 'function') {
    return (type: any).displayName || type.name || null;
  }
  // 3. 字符串 -> 内置标签
  if (typeof type === 'string') {
    return type;
  }
  // 4. 特殊类型
  switch (type) {
    // Fragment 空元素
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';
    // Portal 元素
    case REACT_PORTAL_TYPE:
      return 'Portal';
    // Pofiler 元素
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        const context: ReactContext<any> = (type: any);
        return getContextName(context) + '.Consumer';
      case REACT_PROVIDER_TYPE:
        const provider: ReactProviderType<any> = (type: any);
        return getContextName(provider._context) + '.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);
      case REACT_LAZY_TYPE: {
        const lazyComponent: LazyComponent<any, any> = (type: any);
        const payload = lazyComponent._payload;
        const init = lazyComponent._init;
        try {
          return getComponentName(init(payload));
        } catch (x) {
          return null;
        }
      }
    }
  }
  return null;
}