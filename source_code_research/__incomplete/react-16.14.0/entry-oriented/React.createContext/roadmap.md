# React.createContext 调用路径

<!-- TOC -->

- [React.createContext 调用路径](#reactcreatecontext-调用路径)
  - [1. React.createContext](#1-reactcreatecontext)
  - [2. createContext](#2-createcontext)
    - [2.1 REACT_CONTEXT_TYPE](#21-react_context_type)
    - [2.2 REACT_PROVIDER_TYPE](#22-react_provider_type)
  - [3. 结果](#3-结果)

<!-- /TOC -->

## 1. React.createContext

- `/packages/react/index.js`

```js
export {
  createContext,
} from './src/React';
```

- `/packages/react/src/React.js`

```js
import {createContext} from './ReactContext';

export {
  createContext,
}
```

## 2. createContext

- `/packages/react/src/ReactContext.js`

```js
export function createContext<T>(
  defaultValue: T,
  calculateChangedBits: ?(a: T, b: T) => number,
): ReactContext<T> {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  }

  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: (null: any),
    Consumer: (null: any),
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };

  context.Consumer = context;

  return context;
}
```

### 2.1 REACT_CONTEXT_TYPE

- `/packages/shared/ReactSymbols.js`

```js
export let REACT_CONTEXT_TYPE = 0xeace;

if (typeof Symbol === 'function' && Symbol.for) {
  const symbolFor = Symbol.for;
  REACT_CONTEXT_TYPE = symbolFor('react.context');
}
```

### 2.2 REACT_PROVIDER_TYPE

- `/packages/shared/ReactSymbols.js`

```js
export let REACT_PROVIDER_TYPE = 0xeacd;

if (typeof Symbol === 'function' && Symbol.for) {
  const symbolFor = Symbol.for;
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
}
```

## 3. 结果

- 返回对象

```js
context = {
    $$typeof: Symbol.for('react.context'),
    _calculateChangedBits: null,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: {
      $$typeof: Symbol.for('react.provider'),
      _context: context,
    };,
    Consumer: context,
};
```
