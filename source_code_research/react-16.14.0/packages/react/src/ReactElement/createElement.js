/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

/* React.createElement 创建 React 元素 */
// type -> 标签名 | 类型(构造函数)
// config 标签属性
// children 子元素列表
 export function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;     // key 属性
  let ref = null;     // ref 属性
  let self = null;    // __self 属性
  let source = null;  // __source 属性

  // 1. 处理元素属性
  if (config != null) {
    // 1.1 ref 属性
    if (hasValidRef(config)) {
      ref = config.ref;

      if (__DEV__) {
        // 测试环境下对字符串 ref 发出警告
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }
    // 1.2 key 属性
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // 1.3 __self 属性
    self = config.__self === undefined ? null : config.__self;
    // 1.4 __source 属性
    source = config.__source === undefined ? null : config.__source;

    // Remaining properties are added to a new props object
    // 1.5 将 ref, key, __self, __source 以外的属性加入 props
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  // 2. 收集子元素
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    // 2.1 单一子元素
    props.children = children;
  } else if (childrenLength > 1) {
    // 2.2 多个子元素 -> 从 arguments 获取
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      // 测试环境下冻结子元素数组
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  // 3. 处理默认 props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      // 将 defaultProps 添加到 props(不覆盖已有的值)
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    // 测试环境下为 key, ref 添加警告
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  // 4. 调用 ReactElement 创建 React 元素
  return ReactElement(
    type,   // 标签名 | 构造函数
    key,    // key 属性
    ref,    // ref 属性
    self,   // __self 属性
    source, // __source 属性
    ReactCurrentOwner.current, // 当前父元素
    props,  // 其他属性 v 默认属性(defaultProps)
  );
}