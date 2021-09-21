# ReactDOM.render 调用路径

<!-- TOC -->

- [ReactDOM.render 调用路径](#reactdomrender-调用路径)
  - [1. ReactDOM.render](#1-reactdomrender)
  - [2. ReactDOM.render & initialize](#2-reactdomrender--initialize)
    - [2.1 setAttemptSynchronousHydration(attemptSynchronousHydration)](#21-setattemptsynchronoushydrationattemptsynchronoushydration)
      - [2.1.1 setAttemptSynchronousHydration](#211-setattemptsynchronoushydration)
      - [2.1.2 attemptSynchronousHydration](#212-attemptsynchronoushydration)
        - [2.1.2.1 HostRoot / SuspenseComponent](#2121-hostroot--suspensecomponent)
    - [2.2 setAttemptUserBlockingHydration(attemptUserBlockingHydration)](#22-setattemptuserblockinghydrationattemptuserblockinghydration)
      - [2.2.1 setAttemptUserBlockingHydration](#221-setattemptuserblockinghydration)
      - [2.2.2 attemptUserBlockingHydration](#222-attemptuserblockinghydration)
    - [2.3 setAttemptContinuousHydration(attemptContinuousHydration)](#23-setattemptcontinuoushydrationattemptcontinuoushydration)
      - [2.3.1 setAttemptContinuousHydration](#231-setattemptcontinuoushydration)
      - [2.3.2 attemptContinuousHydration](#232-attemptcontinuoushydration)
    - [2.4 setAttemptHydrationAtCurrentPriority(attemptHydrationAtCurrentPriority)](#24-setattempthydrationatcurrentpriorityattempthydrationatcurrentpriority)
      - [2.4.1 setAttemptHydrationAtCurrentPriority](#241-setattempthydrationatcurrentpriority)
      - [2.4.2 attemptHydrationAtCurrentPriority](#242-attempthydrationatcurrentpriority)
    - [2.5 setGetCurrentUpdatePriority(getCurrentUpdateLanePriority)](#25-setgetcurrentupdateprioritygetcurrentupdatelanepriority)
      - [2.5.1 setGetCurrentUpdatePriority](#251-setgetcurrentupdatepriority)
      - [2.5.2 getCurrentUpdateLanePriority](#252-getcurrentupdatelanepriority)
        - [2.5.2.1 getCurrentUpdateLanePriority](#2521-getcurrentupdatelanepriority)
    - [2.6 setAttemptHydrationAtPriority(runWithPriority)](#26-setattempthydrationatpriorityrunwithpriority)
      - [2.6.1 setAttemptHydrationAtPriority](#261-setattempthydrationatpriority)
      - [2.6.2 runWithPriority](#262-runwithpriority)
        - [2.6.2.1 setCurrentUpdateLanePriority](#2621-setcurrentupdatelanepriority)
    - [2.7 setRestoreImplementation(restoreControlledState)](#27-setrestoreimplementationrestorecontrolledstate)
      - [2.7.1 setRestoreImplementation](#271-setrestoreimplementation)
      - [2.7.2 restoreControlledState](#272-restorecontrolledstate)
    - [2.8 setBatchingImplementation(batchedUpdates, discreteUpdates, flushDiscreteUpdates, batchedEventUpdates)](#28-setbatchingimplementationbatchedupdates-discreteupdates-flushdiscreteupdates-batchedeventupdates)
      - [2.8.1 setBatchingImplementation](#281-setbatchingimplementation)
      - [2.8.2 batchedUpdates](#282-batchedupdates)
      - [2.8.3 discreteUpdates](#283-discreteupdates)
      - [2.8.4 flushDiscreteUpdates](#284-flushdiscreteupdates)
      - [2.8.5 batchedEventUpdates](#285-batchedeventupdates)
    - [2.9 初始化小结](#29-初始化小结)
  - [3. render](#3-render)
    - [3.1 isValidContainer](#31-isvalidcontainer)
      - [3.1.1 HTMLNodeType](#311-htmlnodetype)
    - [3.2 legacyRenderSubtreeIntoContainer](#32-legacyrendersubtreeintocontainer)
      - [3.2.1 legacyCreateRootFromDOMContainer](#321-legacycreaterootfromdomcontainer)
        - [3.2.1.1 shouldHydrateDueToLegacyHeuristic](#3211-shouldhydrateduetolegacyheuristic)
        - [3.2.1.2 getReactRootElementInContainer](#3212-getreactrootelementincontainer)
      - [3.2.2 createLegacyRoot](#322-createlegacyroot)
        - [3.2.2.1 LegacyRoot](#3221-legacyroot)
      - [3.2.3 ReactDOMBlockingRoot](#323-reactdomblockingroot)
      - [3.2.4 createRootImpl](#324-createrootimpl)
        - [3.2.4.1 createContainer](#3241-createcontainer)
        - [3.2.4.2 createFiberRoot](#3242-createfiberroot)
          - [3.2.4.2.1 FiberRootNode](#32421-fiberrootnode)
          - [3.2.4.2.2 createHostRootFiber](#32422-createhostrootfiber)
          - [3.2.4.2.3 createFiber](#32423-createfiber)
          - [3.2.4.2.4 FiberNode](#32424-fibernode)
          - [3.2.4.2.5 initializeUpdateQueue](#32425-initializeupdatequeue)
        - [3.2.4.3 markContainerAsRoot](#3243-markcontainerasroot)
        - [3.2.4.4 listenToAllSupportedEvents](#3244-listentoallsupportedevents)
        - [3.2.4.4.1 allNativeEvents](#32441-allnativeevents)
      - [3.2.5 FiberRoot 小结](#325-fiberroot-小结)
      - [3.2.6 unbatchedUpdates(fn = () => { updateContainer })](#326-unbatchedupdatesfn-----updatecontainer-)
      - [3.2.7 updateContainer](#327-updatecontainer)
        - [3.2.7.1 requestEventTime](#3271-requesteventtime)
          - [3.2.7.1.1 now](#32711-now)
          - [3.2.7.1.2 Scheduler.unstable_now](#32712-schedulerunstable_now)
          - [3.2.7.1.3 getCurrentTime](#32713-getcurrenttime)
        - [3.2.7.2 requestUpdateLane](#3272-requestupdatelane)
  - [](#)

<!-- /TOC -->

## 1. ReactDOM.render

- `/packages/react-dom/index.js`

```js
export {
  render,
} from './src/client/ReactDOM';
```

## 2. ReactDOM.render & initialize

- `/packages/react-dom/src/client/ReactDOM.js`

```js
import {
  render,
} from './ReactDOMLegacy';
import {
  batchedEventUpdates,
  batchedUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
  runWithPriority,
  getCurrentUpdateLanePriority,
} from 'react-reconciler/src/ReactFiberReconciler';
import {restoreControlledState} from './ReactDOMComponent';
import {
  setAttemptSynchronousHydration,
  setAttemptUserBlockingHydration,
  setAttemptContinuousHydration,
  setAttemptHydrationAtCurrentPriority,
  setGetCurrentUpdatePriority,
  setAttemptHydrationAtPriority,
} from '../events/ReactDOMEventReplaying';
import {setBatchingImplementation} from '../events/ReactDOMUpdateBatching';
import {
  setRestoreImplementation,
} from '../events/ReactDOMControlledComponent';

setAttemptSynchronousHydration(attemptSynchronousHydration);
setAttemptUserBlockingHydration(attemptUserBlockingHydration);
setAttemptContinuousHydration(attemptContinuousHydration);
setAttemptHydrationAtCurrentPriority(attemptHydrationAtCurrentPriority);
setGetCurrentUpdatePriority(getCurrentUpdateLanePriority);
setAttemptHydrationAtPriority(runWithPriority);

setRestoreImplementation(restoreControlledState);
setBatchingImplementation(
  batchedUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  batchedEventUpdates,
);

export {
  render,
}
```

### 2.1 setAttemptSynchronousHydration(attemptSynchronousHydration)

#### 2.1.1 setAttemptSynchronousHydration

- `/packages/react-dom/src/events/ReactDOMEventReplaying.js`

```js
let attemptSynchronousHydration: (fiber: Object) => void;

export function setAttemptSynchronousHydration(fn: (fiber: Object) => void) {
  attemptSynchronousHydration = fn;
}
```

#### 2.1.2 attemptSynchronousHydration

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  HostRoot,
  SuspenseComponent,
} from './ReactWorkTags';

export function attemptSynchronousHydration(fiber: Fiber): void {
  switch (fiber.tag) {
    case HostRoot:
      const root: FiberRoot = fiber.stateNode;
      if (root.hydrate) {
        // Flush the first scheduled "update".
        const lanes = getHighestPriorityPendingLanes(root);
        flushRoot(root, lanes);
      }
      break;
    case SuspenseComponent:
      const eventTime = requestEventTime();
      flushSync(() => scheduleUpdateOnFiber(fiber, SyncLane, eventTime));
      // If we're still blocked after this, we need to increase
      // the priority of any promises resolving within this
      // boundary so that they next attempt also has higher pri.
      const retryLane = InputDiscreteHydrationLane;
      markRetryLaneIfNotHydrated(fiber, retryLane);
      break;
  }
}
```

##### 2.1.2.1 HostRoot / SuspenseComponent

- `/packages/react-reconciler/src/ReactWorkTags.js`

```js
export const HostRoot = 3;
export const SuspenseComponent = 13;
```

### 2.2 setAttemptUserBlockingHydration(attemptUserBlockingHydration)

#### 2.2.1 setAttemptUserBlockingHydration

- `/packages/react-dom/src/events/ReactDOMEventReplaying.js`

```js
let attemptUserBlockingHydration: (fiber: Object) => void;

export function setAttemptUserBlockingHydration(fn: (fiber: Object) => void) {
  attemptUserBlockingHydration = fn;
}
```

#### 2.2.2 attemptUserBlockingHydration

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
export function attemptUserBlockingHydration(fiber: Fiber): void {
  if (fiber.tag !== SuspenseComponent) {
    return;
  }
  const eventTime = requestEventTime();
  const lane = InputDiscreteHydrationLane;
  scheduleUpdateOnFiber(fiber, lane, eventTime);
  markRetryLaneIfNotHydrated(fiber, lane);
}
```

### 2.3 setAttemptContinuousHydration(attemptContinuousHydration)

#### 2.3.1 setAttemptContinuousHydration

- `/packages/react-dom/src/events/ReactDOMEventReplaying.js`

```js
let attemptContinuousHydration: (fiber: Object) => void;

export function setAttemptContinuousHydration(fn: (fiber: Object) => void) {
  attemptContinuousHydration = fn;
}
```

#### 2.3.2 attemptContinuousHydration

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
export function attemptContinuousHydration(fiber: Fiber): void {
  if (fiber.tag !== SuspenseComponent) {
    return;
  }
  const eventTime = requestEventTime();
  const lane = SelectiveHydrationLane;
  scheduleUpdateOnFiber(fiber, lane, eventTime);
  markRetryLaneIfNotHydrated(fiber, lane);
}
```

### 2.4 setAttemptHydrationAtCurrentPriority(attemptHydrationAtCurrentPriority)

#### 2.4.1 setAttemptHydrationAtCurrentPriority

- `/packages/react-dom/src/events/ReactDOMEventReplaying.js`

```js
let attemptHydrationAtCurrentPriority: (fiber: Object) => void;

export function setAttemptHydrationAtCurrentPriority(
  fn: (fiber: Object) => void,
) {
  attemptHydrationAtCurrentPriority = fn;
}
```

#### 2.4.2 attemptHydrationAtCurrentPriority

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
export function attemptHydrationAtCurrentPriority(fiber: Fiber): void {
  if (fiber.tag !== SuspenseComponent) {
    return;
  }
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(fiber);
  scheduleUpdateOnFiber(fiber, lane, eventTime);
  markRetryLaneIfNotHydrated(fiber, lane);
}
```

### 2.5 setGetCurrentUpdatePriority(getCurrentUpdateLanePriority)

#### 2.5.1 setGetCurrentUpdatePriority

- `/packages/react-dom/src/events/ReactDOMEventReplaying.js`

```js
let getCurrentUpdatePriority: () => LanePriority;

export function setGetCurrentUpdatePriority(fn: () => LanePriority) {
  getCurrentUpdatePriority = fn;
}
```

#### 2.5.2 getCurrentUpdateLanePriority

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  getCurrentUpdateLanePriority,
} from './ReactFiberLane';

export {getCurrentUpdateLanePriority};
```

##### 2.5.2.1 getCurrentUpdateLanePriority

- `/packages/react-reconciler/src/ReactFiberLane.js`

```js
export const NoLanePriority: LanePriority = 0;

let currentUpdateLanePriority: LanePriority = NoLanePriority;

export function getCurrentUpdateLanePriority(): LanePriority {
  return currentUpdateLanePriority;
}
```

### 2.6 setAttemptHydrationAtPriority(runWithPriority)

#### 2.6.1 setAttemptHydrationAtPriority

- `/packages/react-dom/src/events/ReactDOMEventReplaying.js`

```js
let attemptHydrationAtPriority: <T>(priority: LanePriority, fn: () => T) => T;

export function setAttemptHydrationAtPriority(
  fn: <T>(priority: LanePriority, fn: () => T) => T,
) {
  attemptHydrationAtPriority = fn;
}
```

#### 2.6.2 runWithPriority

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  setCurrentUpdateLanePriority,
} from './ReactFiberLane';

export function runWithPriority<T>(priority: LanePriority, fn: () => T) {
  const previousPriority = getCurrentUpdateLanePriority();
  try {
    setCurrentUpdateLanePriority(priority);
    return fn();
  } finally {
    setCurrentUpdateLanePriority(previousPriority);
  }
}
```

##### 2.6.2.1 setCurrentUpdateLanePriority

- `/packages/react-reconciler/src/ReactFiberLane.js`

```js
export function setCurrentUpdateLanePriority(newLanePriority: LanePriority) {
  currentUpdateLanePriority = newLanePriority;
}
```

### 2.7 setRestoreImplementation(restoreControlledState)

#### 2.7.1 setRestoreImplementation

- `/packages/react-dom/src/events/ReactDOMControlledComponent.js`

```js
let restoreImpl = null;

export function setRestoreImplementation(
  impl: (domElement: Element, tag: string, props: Object) => void,
): void {
  restoreImpl = impl;
}
```

#### 2.7.2 restoreControlledState

- `/packages/react-dom/src/client/ReactDOMComponent.js`

```js
import {
  restoreControlledState as ReactDOMInputRestoreControlledState,
} from './ReactDOMInput';
import {
  restoreControlledState as ReactDOMTextareaRestoreControlledState,
} from './ReactDOMTextarea';
import {
  restoreControlledState as ReactDOMSelectRestoreControlledState,
} from './ReactDOMSelect';

export function restoreControlledState(
  domElement: Element,
  tag: string,
  props: Object,
): void {
  switch (tag) {
    case 'input':
      ReactDOMInputRestoreControlledState(domElement, props);
      return;
    case 'textarea':
      ReactDOMTextareaRestoreControlledState(domElement, props);
      return;
    case 'select':
      ReactDOMSelectRestoreControlledState(domElement, props);
      return;
  }
}
```

### 2.8 setBatchingImplementation(batchedUpdates, discreteUpdates, flushDiscreteUpdates, batchedEventUpdates)

#### 2.8.1 setBatchingImplementation

- `/packages/react-dom/src/events/ReactDOMUpdateBatching.js`

```js
let batchedUpdatesImpl = function(fn, bookkeeping) {
  return fn(bookkeeping);
};
let discreteUpdatesImpl = function(fn, a, b, c, d) {
  return fn(a, b, c, d);
};
let flushDiscreteUpdatesImpl = function() {};
let batchedEventUpdatesImpl = batchedUpdatesImpl;

export function setBatchingImplementation(
  _batchedUpdatesImpl,
  _discreteUpdatesImpl,
  _flushDiscreteUpdatesImpl,
  _batchedEventUpdatesImpl,
) {
  batchedUpdatesImpl = _batchedUpdatesImpl;
  discreteUpdatesImpl = _discreteUpdatesImpl;
  flushDiscreteUpdatesImpl = _flushDiscreteUpdatesImpl;
  batchedEventUpdatesImpl = _batchedEventUpdatesImpl;
}
```

#### 2.8.2 batchedUpdates

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  batchedUpdates,
} from './ReactFiberWorkLoop.old';

export {
  batchedUpdates,
}
```

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
let executionContext: ExecutionContext = NoContext;
const BatchedContext = /*               */ 0b0000001;

export function batchedUpdates<A, R>(fn: A => R, a: A): R {
  const prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer();
      flushSyncCallbackQueue();
    }
  }
}
```

#### 2.8.3 discreteUpdates

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  discreteUpdates,
} from './ReactFiberWorkLoop.old';

export {
  discreteUpdates,
}
```

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
export function discreteUpdates<A, B, C, D, R>(
  fn: (A, B, C) => R,
  a: A,
  b: B,
  c: C,
  d: D,
): R {
  const prevExecutionContext = executionContext;
  executionContext |= DiscreteEventContext;

  if (decoupleUpdatePriorityFromScheduler) {
    const previousLanePriority = getCurrentUpdateLanePriority();
    try {
      setCurrentUpdateLanePriority(InputDiscreteLanePriority);
      return runWithPriority(
        UserBlockingSchedulerPriority,
        fn.bind(null, a, b, c, d),
      );
    } finally {
      setCurrentUpdateLanePriority(previousLanePriority);
      executionContext = prevExecutionContext;
      if (executionContext === NoContext) {
        // Flush the immediate callbacks that were scheduled during this batch
        resetRenderTimer();
        flushSyncCallbackQueue();
      }
    }
  } else {
    try {
      return runWithPriority(
        UserBlockingSchedulerPriority,
        fn.bind(null, a, b, c, d),
      );
    } finally {
      executionContext = prevExecutionContext;
      if (executionContext === NoContext) {
        // Flush the immediate callbacks that were scheduled during this batch
        resetRenderTimer();
        flushSyncCallbackQueue();
      }
    }
  }
}
```

#### 2.8.4 flushDiscreteUpdates

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  flushDiscreteUpdates,
} from './ReactFiberWorkLoop.old';

export {
  flushDiscreteUpdates,
}
```

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
export function flushDiscreteUpdates() {
  if (
    (executionContext & (BatchedContext | RenderContext | CommitContext)) !==
    NoContext
  ) {
    if (__DEV__) {
      if ((executionContext & RenderContext) !== NoContext) {
        console.error(
          'unstable_flushDiscreteUpdates: Cannot flush updates when React is ' +
            'already rendering.',
        );
      }
    }
    return;
  }
  flushPendingDiscreteUpdates();
  flushPassiveEffects();
}
```

#### 2.8.5 batchedEventUpdates

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  batchedEventUpdates,
} from './ReactFiberWorkLoop.old';

export {
  batchedEventUpdates,
}
```

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
export function batchedEventUpdates<A, R>(fn: A => R, a: A): R {
  const prevExecutionContext = executionContext;
  executionContext |= EventContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer();
      flushSyncCallbackQueue();
    }
  }
}
```

### 2.9 初始化小结

- 初始化全局变量

```js
// /packages/react-dom/src/events/ReactDOMEventReplaying.js
  attemptSynchronousHydration
  attemptUserBlockingHydration
  attemptContinuousHydration
  attemptHydrationAtCurrentPriority
  getCurrentUpdatePriority
  attemptHydrationAtPriority

// /packages/react-dom/src/events/ReactDOMControlledComponent.js
  restoreImpl

// /packages/react-dom/src/events/ReactDOMUpdateBatching.js
  batchedUpdatesImpl
  discreteUpdatesImpl
  flushDiscreteUpdatesImpl
  batchedEventUpdatesImpl
```

## 3. render

- `/packages/react-dom/src/client/ReactDOMLegacy.js`

```js
import {isValidContainer} from './ReactDOMRoot';

// exmplae
/*
ReactDOM.render(<App/>, document.querySelector('#app'))
=> ReactDOM.render(React.createElement(App), document.querySelector('#app'))
=> legacyRenderSubtreeIntoContainer(
  null,
  React.createElement(App),
  document.querySelector('#app'),
  false,
  undefined
)
*/
export function render(
  element: React$Element<any>,
  container: Container,
  callback: ?Function,
) {
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );

  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}
```

### 3.1 isValidContainer

- `/packages/react-dom/src/client/ReactDOMRoot.js`

```js
import {
  ELEMENT_NODE,
  COMMENT_NODE,
  DOCUMENT_NODE,
  DOCUMENT_FRAGMENT_NODE,
} from '../shared/HTMLNodeType';

export function isValidContainer(node: mixed): boolean {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE ||
      (node.nodeType === COMMENT_NODE &&
        (node: any).nodeValue === ' react-mount-point-unstable '))
  );
}
```

#### 3.1.1 HTMLNodeType

- `/packages/react-dom/src/shared/HTMLNodeType.js`

```js
export const ELEMENT_NODE = 1;            // 元素节点
export const TEXT_NODE = 3;               // 文字节点
export const COMMENT_NODE = 8;            // 注释节点
export const DOCUMENT_NODE = 9;           // 文档节点
export const DOCUMENT_FRAGMENT_NODE = 11; // 文档碎片节点
```

### 3.2 legacyRenderSubtreeIntoContainer

- `/packages/react-dom/src/client/ReactDOMLegacy.js`

```js
import {
  updateContainer,
  unbatchedUpdates,
} from 'react-reconciler/src/ReactFiberReconciler';

/*
ReactDOM.render(<App/>, document.querySelector('#app'))
=> legacyRenderSubtreeIntoContainer(
  parentComponent = null,
  children        = React.createElement(App),
  container       = document.querySelector('#app'),
  forceHydrate    = false,
  callback        = undefined
)
*/
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function,
) {
  let root: RootType = (container._reactRootContainer: any);
  let fiberRoot;
  if (!root) {
    // 第一次渲染
    // ReactDOMBlockingRoot { _internalRoot, render, unmount }
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    fiberRoot = root._internalRoot;

    // callback = undefined
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }

    // 首次渲染使用 unbatch 更新
    unbatchedUpdates(() => {
      /*
      updateContainer(
        React.createElement(App) = container,
        root._internalRoot,
        null,
        undefined,
      )
      */
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    // 更新
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    updateContainer(children, fiberRoot, parentComponent, callback);
  }
  return getPublicRootInstance(fiberRoot);
}
```

#### 3.2.1 legacyCreateRootFromDOMContainer

- `/packages/react-dom/src/client/ReactDOMLegacy.js`

```js
import {createLegacyRoot} from './ReactDOMRoot';

/*
legacyCreateRootFromDOMContainer(
  container    = document.querySelector('#app'),
  forceHydrate = false
) => ReactDOMBlockingRoot { _internalRoot, render, unmount }
*/
function legacyCreateRootFromDOMContainer(
  container: Container,
  forceHydrate: boolean,
): RootType {
  // false
  const shouldHydrate =
    forceHydrate || shouldHydrateDueToLegacyHeuristic(container);

  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    // 清理所有 container 之下的节点
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }

  // createLegacyRoot(document.querySelector('#app'), undefined)
  return createLegacyRoot(
    container,
    shouldHydrate
      ? {
          hydrate: true,
        }
      : undefined,
  );
}
```

##### 3.2.1.1 shouldHydrateDueToLegacyHeuristic

- `/packages/react-dom/src/client/ReactDOMLegacy.js`

```js
// container = document.querySelector('#app')
function shouldHydrateDueToLegacyHeuristic(container) {
  const rootElement = getReactRootElementInContainer(container);
  // false
  return !!(
    rootElement &&
    rootElement.nodeType === ELEMENT_NODE &&
    rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME)
  );
}
```

##### 3.2.1.2 getReactRootElementInContainer

- `/packages/react-dom/src/client/ReactDOMLegacy.js`

```js
// container = document.querySelector('#app')
function getReactRootElementInContainer(container: any) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOCUMENT_NODE) {
    return container.documentElement;
  } else {
    // null
    return container.firstChild;
  }
}
```

#### 3.2.2 createLegacyRoot

- `/packages/react-dom/src/client/ReactDOMRoot.js`

```js
import {
  LegacyRoot,
} from 'react-reconciler/src/ReactRootTags';

// createLegacyRoot(document.querySelector('#app'), undefined)
export function createLegacyRoot(
  container: Container,
  options?: RootOptions,
): RootType {
  /*
  new ReactDOMBlockingRoot(
    document.querySelector('#app'),
    0,
    undefined
  ) => ReactDOMBlockingRoot { _internalRoot, render, unmount }
  */
  return new ReactDOMBlockingRoot(container, LegacyRoot, options);
}
```

##### 3.2.2.1 LegacyRoot

- `/packages/react-reconciler/src/ReactRootTags.js`

```js
export type RootTag = 0 | 1 | 2;

export const LegacyRoot = 0;
export const BlockingRoot = 1;
export const ConcurrentRoot = 2;
```

#### 3.2.3 ReactDOMBlockingRoot

- `/packages/react-dom/src/client/ReactDOMRoot.js`

```js
/*
new ReactDOMBlockingRoot(
  container = document.querySelector('#app'),
  tag       = 0,
  options   = undefined
)
*/
function ReactDOMBlockingRoot(
  container: Container,
  tag: RootTag,
  options: void | RootOptions,
) {
  // createRootImpl => OpaqueRoot (FiberRoot 类)
  this._internalRoot = createRootImpl(container, tag, options);
}

ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function(
  children: ReactNodeList,
): void {
  const root = this._internalRoot;
  updateContainer(children, root, null, null);
};

ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function(): void {
  const root = this._internalRoot;
  const container = root.containerInfo;
  updateContainer(null, root, null, () => {
    unmarkContainerAsRoot(container);
  });
};
```

#### 3.2.4 createRootImpl

- `/packages/react-dom/src/client/ReactDOMRoot.js`

```js
import {
  createContainer,
} from 'react-reconciler/src/ReactFiberReconciler';
import {
  markContainerAsRoot,
} from './ReactDOMComponentTree';
import {listenToAllSupportedEvents} from '../events/DOMPluginEventSystem';

/*
createRootImpl(
  container = document.querySelector('#app'),
  tag       = 0,
  options   = undefined
)
*/
function createRootImpl(
  container: Container,
  tag: RootTag,
  options: void | RootOptions,
) {
  // hydrate = false
  const hydrate = options != null && options.hydrate === true;
  // hydrationCallbacks = null
  const hydrationCallbacks =
    (options != null && options.hydrationOptions) || null;
  // mutableSources = null
  const mutableSources =
    (options != null &&
      options.hydrationOptions != null &&
      options.hydrationOptions.mutableSources) ||
    null;

  /*
  createContainer(
    document.querySelector('#app'),
    0,
    false,
    null,
  ) => OpaqueRoot (FiberRoot 类)
  */
  const root = createContainer(container, tag, hydrate, hydrationCallbacks);
  markContainerAsRoot(root.current, container);

  // rootContainerElement = container
  const rootContainerElement =
    container.nodeType === COMMENT_NODE ? container.parentNode : container;
  listenToAllSupportedEvents(rootContainerElement);

  // mutableSources = null
  if (mutableSources) {
    for (let i = 0; i < mutableSources.length; i++) {
      const mutableSource = mutableSources[i];
      registerMutableSourceForHydration(root, mutableSource);
    }
  }

  return root;
}
```

##### 3.2.4.1 createContainer

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {createFiberRoot} from './ReactFiberRoot.old';

/*
createContainer(
  containerInfo       = document.querySelector('#app'),
  tag                 = 0,
  hydrate             = false,
  hydrationCallbacks  = null,
)
*/
export function createContainer(
  containerInfo: Container,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
): OpaqueRoot {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}
```

##### 3.2.4.2 createFiberRoot

- `/packages/react-reconciler/src/ReactFiberRoot.js`

```js
import {createHostRootFiber} from './ReactFiber.old';
import {
  enableSuspenseCallback,
} from 'shared/ReactFeatureFlags';
import {initializeUpdateQueue} from './ReactUpdateQueue.old';

/*
createFiberRoot(
  containerInfo       = document.querySelector('#app'),
  tag                 = 0,
  hydrate             = false,
  hydrationCallbacks  = null,
)
*/
export function createFiberRoot(
  containerInfo: any,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
): FiberRoot {
  /*
  new FiberRootNode(
    document.querySelector('#app'),
    0,
    false,
  ) => FiberRoot 类
  */
  const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);

  // enableSuspenseCallback = false
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }

  // createHostRootFiber(0) => Fiber(FiberNode 类)
  const uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  // uninitializedFiber.updateQueue = UpdateQueue
  initializeUpdateQueue(uninitializedFiber);

  return root;
}
```

###### 3.2.4.2.1 FiberRootNode

- `/packages/react-reconciler/src/ReactFiberRoot.js`

```js
/*
new FiberRootNode(
  containerInfo       = document.querySelector('#app'),
  tag                 = 0,
  hydrate             = false,
)
*/
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;                       // LegacyRoot = 0
  this.containerInfo = containerInfo;   // document.querySelector('#app')
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;               // false
  this.callbackNode = null;
  this.callbackPriority = NoLanePriority;
  this.eventTimes = createLaneMap(NoLanes);
  this.expirationTimes = createLaneMap(NoTimestamp);

  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;

  this.entangledLanes = NoLanes;
  this.entanglements = createLaneMap(NoLanes);

  if (supportsHydration) {
    this.mutableSourceEagerHydrationData = null;
  }

  if (enableSchedulerTracing) {
    this.interactionThreadID = unstable_getThreadID();
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
  }
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }
}
```

###### 3.2.4.2.2 createHostRootFiber

- `/packages/react-reconciler/src/ReactFiber.js`

```js
import {
  enableProfilerTimer,
} from 'shared/ReactFeatureFlags';
import {isDevToolsPresent} from './ReactFiberDevToolsHook.old';
import {
  HostRoot, // HostRoot = 3
} from './ReactWorkTags';

// createHostRootFiber(LegacyRoot = 0)
export function createHostRootFiber(tag: RootTag): Fiber {
  let mode;
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode | BlockingMode | StrictMode;
  } else if (tag === BlockingRoot) {
    mode = BlockingMode | StrictMode;
  } else {
    // tag = 0 (LegacyRoot)
    mode = NoMode;
  }

  if (enableProfilerTimer && isDevToolsPresent) {
    mode |= ProfileMode;
  }

  // createFiber(3, null, null, 0)
  return createFiber(HostRoot, null, null, mode);
}
```

###### 3.2.4.2.3 createFiber

```js
/*
createFiber(
  tag           = 3,
  pendingProps  = null,
  key           = null,
  mode          = 0,
)
*/
const createFiber = function(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
): Fiber {
  return new FiberNode(tag, pendingProps, key, mode);
};
```

###### 3.2.4.2.4 FiberNode

```js
/*
new FiberNode(
  tag           = 3,
  pendingProps  = null,
  key           = null,
  mode          = 0,
)
*/
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  this.tag = tag;          // 3
  this.key = key;          // null
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;   // null
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;       // 0

  // Effects
  this.flags = NoFlags;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;

  if (enableProfilerTimer) {
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN;

    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }
}
```

###### 3.2.4.2.5 initializeUpdateQueue

- `/packages/react-reconciler/src/ReactUpdateQueue.js`

```js
export function initializeUpdateQueue<State>(fiber: Fiber): void {
  const queue: UpdateQueue<State> = {
    baseState: fiber.memoizedState, // null
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    effects: null,
  };
  fiber.updateQueue = queue;
}
```

##### 3.2.4.3 markContainerAsRoot

- `/packages/react-dom/src/client/ReactDOMComponentTree.js`

```js
const internalContainerInstanceKey = '__reactContainer$' + randomKey;

export function markContainerAsRoot(hostRoot: Fiber, node: Container): void {
  node[internalContainerInstanceKey] = hostRoot;
}
```

##### 3.2.4.4 listenToAllSupportedEvents

- `/packages/react-dom/src/events/DOMPluginEventSystem.js`

```js
import {allNativeEvents} from './EventRegistry';

export const mediaEventTypes: Array<DOMEventName> = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
];

export const nonDelegatedEvents: Set<DOMEventName> = new Set([
  'cancel',
  'close',
  'invalid',
  'load',
  'scroll',
  'toggle',
  ...mediaEventTypes,
]);

const listeningMarker =
  '_reactListening' +
  Math.random()
    .toString(36)
    .slice(2);

export function listenToAllSupportedEvents(rootContainerElement: EventTarget) {
  if ((rootContainerElement: any)[listeningMarker]) {
    return;
  }
  (rootContainerElement: any)[listeningMarker] = true;
  allNativeEvents.forEach(domEventName => {
    if (!nonDelegatedEvents.has(domEventName)) {
      listenToNativeEvent(
        domEventName,
        false,
        ((rootContainerElement: any): Element),
        null,
      );
    }
    listenToNativeEvent(
      domEventName,
      true,
      ((rootContainerElement: any): Element),
      null,
    );
  });
}
```

##### 3.2.4.4.1 allNativeEvents

- `/packages/react-dom/src/events/EventRegistry.js`

```js
import {enableCreateEventHandleAPI} from 'shared/ReactFeatureFlags';

export const allNativeEvents: Set<DOMEventName> = new Set();

if (enableCreateEventHandleAPI) {
  allNativeEvents.add('beforeblur');
  allNativeEvents.add('afterblur');
}
```

#### 3.2.5 FiberRoot 小结

- 调用

```js
root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
  container,
  forceHydrate,
);
```

```js
container[__reactContainer] = root;

root /* ReactDOMBlockingRoot 类型 */ = {
  render(children) { updateContainer },
  unmount() { updateContainer },
  _internalRoot: /* FiberRoot 类型 */ {
    tag: tag;                       // LegacyRoot = 0
    containerInfo: containerInfo;   // document.querySelector('#app')
    pendingChildren: null;
    current: /* FiberNode 类型 */ {
      tag: tag;          // 3
      key: key;          // null
      elementType: null;
      type: null;
      stateNode: _internalRoot;

      // Fiber
      return: null;
      child: null;
      sibling: null;
      index: 0;

      ref: null;

      pendingProps: pendingProps;   // null
      memoizedProps: null;
      updateQueue: /* UpdateQueue 类型 */ {
        baseState: fiber.memoizedState, // null
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
        },
        effects: null,
      };
      memoizedState: null;
      dependencies: null;

      mode: mode;       // 0

      // Effects
      flags: NoFlags;
      nextEffect: null;

      firstEffect: null;
      lastEffect: null;

      lanes: NoLanes;
      childLanes: NoLanes;

      alternate: null;
    };
    pingCache: null;
    finishedWork: null;
    timeoutHandle: noTimeout;
    context: null;
    pendingContext: null;
    hydrate: hydrate;               // false
    callbackNode: null;
    callbackPriority: NoLanePriority;
    eventTimes: createLaneMap(NoLanes);
    expirationTimes: createLaneMap(NoTimestamp);

    pendingLanes: NoLanes;
    suspendedLanes: NoLanes;
    pingedLanes: NoLanes;
    expiredLanes: NoLanes;
    mutableReadLanes: NoLanes;
    finishedLanes: NoLanes;

    entangledLanes: NoLanes;
    entanglements: createLaneMap(NoLanes);
  },
}
```

#### 3.2.6 unbatchedUpdates(fn = () => { updateContainer })

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  unbatchedUpdates,
} from './ReactFiberWorkLoop.old';

export {
  unbatchedUpdates,
}
```

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
export const NoContext = /*             */ 0b0000000;
const BatchedContext = /*               */ 0b0000001;
const LegacyUnbatchedContext = /*       */ 0b0001000;

let executionContext: ExecutionContext = NoContext;

export function unbatchedUpdates<A, R>(fn: (a: A) => R, a: A): R {
  const prevExecutionContext = executionContext;
  executionContext &= ~BatchedContext;        // batched = false
  executionContext |= LegacyUnbatchedContext; // legacyUnbatched = true
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer();
      flushSyncCallbackQueue();
    }
  }
}
```

#### 3.2.7 updateContainer

- `/packages/react-reconciler/src/ReactFiberReconciler.js`

```js
import {
  requestEventTime,
  requestUpdateLane,
  scheduleUpdateOnFiber,
} from './ReactFiberWorkLoop.old';

/*
updateContainer(
  element         = React.createElement(App),
  container       = root._internalRoot,
  parentComponent = null,
  callback        = undefined,
)
*/
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): Lane {
  // FiberNode 类型
  const current = container.current;
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(current);

  // enableSchedulingProfiler = false
  if (enableSchedulingProfiler) {
    markRenderScheduled(lane);
  }

  const context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  const update = createUpdate(eventTime, lane);
  update.payload = {element};

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  enqueueUpdate(current, update);
  scheduleUpdateOnFiber(current, lane, eventTime);

  return lane;
}
```

##### 3.2.7.1 requestEventTime

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
import {
  now,
} from './SchedulerWithReactIntegration.old';
import {
  NoTimestamp,
} from './ReactFiberLane';

export function requestEventTime() {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    return now();
  }
  if (currentEventTime !== NoTimestamp) {
    return currentEventTime;
  }
  currentEventTime = now();
  return currentEventTime;
}
```

###### 3.2.7.1.1 now

- `/packages/react-reconciler/src/SchedulerWithReactIntegration.js`

```js
import * as Scheduler from 'scheduler';

const {
  unstable_now: Scheduler_now,
} = Scheduler;

export const now =
  initialTimeMs < 10000 ? Scheduler_now : () => Scheduler_now() - initialTimeMs;
```

###### 3.2.7.1.2 Scheduler.unstable_now

- `/packages/scheduler/index.js`

```js
'use strict';

export * from './src/Scheduler';
```

- `/packages/scheduler/src/Scheduler.js`

```js
import {
  getCurrentTime,
} from './SchedulerHostConfig';

export {
  getCurrentTime as unstable_now,
};
```

###### 3.2.7.1.3 getCurrentTime

- `/packages/scheduler/src/SchedulerHostConfig.js`

```js
export let getCurrentTime;

const hasPerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

if (hasPerformanceNow) {
  const localPerformance = performance;
  getCurrentTime = () => localPerformance.now();
} else {
  const localDate = Date;
  const initialTime = localDate.now();
  getCurrentTime = () => localDate.now() - initialTime;
}
```

##### 3.2.7.2 requestUpdateLane

- `/packages/react-reconciler/src/ReactFiberWorkLoop.js`

```js
export function requestUpdateLane(fiber: Fiber): Lane {
  const mode = fiber.mode;
  if ((mode & BlockingMode) === NoMode) {
    return (SyncLane: Lane);
  } else if ((mode & ConcurrentMode) === NoMode) {
    return getCurrentPriorityLevel() === ImmediateSchedulerPriority
      ? (SyncLane: Lane)
      : (SyncBatchedLane: Lane);
  } else if (
    !deferRenderPhaseUpdateToNextBatch &&
    (executionContext & RenderContext) !== NoContext &&
    workInProgressRootRenderLanes !== NoLanes
  ) {
    return pickArbitraryLane(workInProgressRootRenderLanes);
  }

  if (currentEventWipLanes === NoLanes) {
    currentEventWipLanes = workInProgressRootIncludedLanes;
  }

  const isTransition = requestCurrentTransition() !== NoTransition;
  if (isTransition) {
    if (currentEventPendingLanes !== NoLanes) {
      currentEventPendingLanes =
        mostRecentlyUpdatedRoot !== null
          ? mostRecentlyUpdatedRoot.pendingLanes
          : NoLanes;
    }
    return findTransitionLane(currentEventWipLanes, currentEventPendingLanes);
  }

  const schedulerPriority = getCurrentPriorityLevel();

  let lane;
  if (
    (executionContext & DiscreteEventContext) !== NoContext &&
    schedulerPriority === UserBlockingSchedulerPriority
  ) {
    lane = findUpdateLane(InputDiscreteLanePriority, currentEventWipLanes);
  } else {
    const schedulerLanePriority = schedulerPriorityToLanePriority(
      schedulerPriority,
    );

    if (decoupleUpdatePriorityFromScheduler) {
      const currentUpdateLanePriority = getCurrentUpdateLanePriority();
    }

    lane = findUpdateLane(schedulerLanePriority, currentEventWipLanes);
  }

  return lane;
}
```


## 