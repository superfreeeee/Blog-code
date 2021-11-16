# React.Component / React.PureComponent 调用路径

<!-- TOC -->

- [React.Component / React.PureComponent 调用路径](#reactcomponent--reactpurecomponent-调用路径)
  - [1. React.Component / React.PureComponent](#1-reactcomponent--reactpurecomponent)
  - [2. Component / PureComponent](#2-component--purecomponent)
    - [2.1 Component](#21-component)
      - [2.1.1 ReactNoopUpdateQueue](#211-reactnoopupdatequeue)
    - [2.2 PureComponent](#22-purecomponent)
  - [3. 结果](#3-结果)

<!-- /TOC -->

## 1. React.Component / React.PureComponent

- `/packages/react/index.js`

```js
export {
  Component,
  PureComponent,
} from './src/React';
```

- `/packages/react/src/React.js`

```js
import {Component, PureComponent} from './ReactBaseClasses';

export {
  Component,
  PureComponent,
}
```

## 2. Component / PureComponent

- `/packages/react/src/ReactBaseClasses.js`

```js
function Component(props, context, updater) {}
function PureComponent(props, context, updater) {}

export {Component, PureComponent};
```

### 2.1 Component

- `/packages/react/src/ReactBaseClasses.js`

```js
import ReactNoopUpdateQueue from './ReactNoopUpdateQueue';

function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

// isReactComponent = {}
Component.prototype.isReactComponent = {};

// this.setState => this.updater.enqueueSetState
Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

// this.forceUpdate => this.updater.enqueueForceUpdate
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
```

#### 2.1.1 ReactNoopUpdateQueue

- `/packages/react/src/ReactNoopUpdateQueue.js`

```js
const ReactNoopUpdateQueue = {
  isMounted: function(publicInstance) {
    return false;
  },

  enqueueForceUpdate: function(publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  enqueueReplaceState: function(
    publicInstance,
    completeState,
    callback,
    callerName,
  ) {
    warnNoop(publicInstance, 'replaceState');
  },

  enqueueSetState: function(
    publicInstance,
    partialState,
    callback,
    callerName,
  ) {
    warnNoop(publicInstance, 'setState');
  },
};

export default ReactNoopUpdateQueue;
```

### 2.2 PureComponent

- `/packages/react/src/ReactBaseClasses.js`

```js
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

// PureComponent 继承 Component
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
// PureComponent.prototype.isPureReactComponent = true
pureComponentPrototype.isPureReactComponent = true;
```

## 3. 结果

- Component 返回对象

```js
{
    props: props,
    context: context,
    refs: {},
    updater: updater,
}

prototype = {
    isReactComponent: {},
    setState: () => { this.updater.enqueueSetState },
    forceUpdate: () => { this.updater.enqueueForceUpdate },
}
```

- PureComponent 返回对象

```js
{
    props: props,
    context: context,
    refs: {},
    updater: updater,
}

prototype = new ComponentDummy() = Object.assign({
    isPureReactComponent: true
}, Component.prototype)

ComponentDummy.prototype = Component.prototype
```
