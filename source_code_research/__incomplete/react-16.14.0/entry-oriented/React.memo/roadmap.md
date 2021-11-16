# React.memo 调用路径

<!-- TOC -->

- [React.memo 调用路径](#reactmemo-调用路径)
  - [1. React.memo](#1-reactmemo)
  - [2. memo](#2-memo)
  - [3. 结果](#3-结果)

<!-- /TOC -->

## 1. React.memo

- `/packages/react/index.js`

```js
export {
  memo,
} from './src/React';
```

- `/packages/react/src/React.js`

```js
import {memo} from './ReactMemo';

export {
  memo,
}
```

## 2. memo

- `/packages/react/src/ReactMemo.js`

```js
import {REACT_MEMO_TYPE} from 'shared/ReactSymbols';

export function memo<Props>(
  type: React$ElementType,
  compare?: (oldProps: Props, newProps: Props) => boolean,
) {
  const elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };

  return elementType;
}
```

## 3. 结果

- 返回对象

```js
{
    $$typeof: Symbol.for('react.memo'),
    type,
    compare: compare === undefined ? null : compare
}
```
