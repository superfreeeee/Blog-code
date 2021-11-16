# React.createElement 调用路径

<!-- TOC -->

- [React.createElement 调用路径](#reactcreateelement-调用路径)
  - [1. React.createElement](#1-reactcreateelement)
  - [3. createElement](#3-createelement)
    - [3.1 hasValidRef](#31-hasvalidref)
    - [3.2 hasValidKey](#32-hasvalidkey)
    - [3.3 ReactCurrentOwner](#33-reactcurrentowner)
  - [4. ReactElement](#4-reactelement)
    - [4.1 REACT_ELEMENT_TYPE](#41-react_element_type)
  - [5. 结果](#5-结果)

<!-- /TOC -->

## 1. React.createElement

- `/packages/react/index.js`

```js
export { createElement } from './src/React'
```

- `/packages/react/src/React.js`

```js
import {
  createElement as createElementProd,
} from './ReactElement';

const createElement = __DEV__ ? createElementWithValidation : createElementProd;

export { createElement }
```

## 3. createElement

- `/packages/react/src/ReactElement.js`

```js
import ReactCurrentOwner from './ReactCurrentOwner';

/**
 * <div style={{}}>Hello World</div>
 * => React.createElement("div",{ style: {} }, "Hello World");
 */
export function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // config => props
  if (config != null) {
    // ref 属性
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    // key 属性
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // self 属性、source 属性
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    // 其他属性
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // children 处理
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // React 组件的 defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // React.createElement("div",{ style: {} }, "Hello World");
  // => ReactElement("div", null, null, null, null, ?, {})
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

### 3.1 hasValidRef

- `/packages/react/src/ReactElement.js`

```js
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}
```

### 3.2 hasValidKey

- `/packages/react/src/ReactElement.js`

```js
function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}
```

### 3.3 ReactCurrentOwner

- `/packages/react/src/ReactCurrentOwner.js`

```js
import type {Fiber} from 'react-reconciler/src/ReactInternalTypes';

const ReactCurrentOwner = {
  current: (null: null | Fiber),
};

export default ReactCurrentOwner;
```

## 4. ReactElement

- `/packages/react/src/ReactElement.js`

```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,

    _owner: owner,
  };
  return element;
};
```

### 4.1 REACT_ELEMENT_TYPE

- `/packages/shared/ReactSymbols.js`

```js
export let REACT_ELEMENT_TYPE = 0xeac7;

if (typeof Symbol === 'function' && Symbol.for) {
  const symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
}
```

## 5. 结果

-  调用

```js
const el = React.createElement("div",{ style: {} }, "Hello World");
```

```js
el = {
    $$typeof: Symbol.for('react.element'),
    type: 'div',
    key: null,
    ref: null,
    props: {},
    _owner: ? // null | Fiber
}
```

