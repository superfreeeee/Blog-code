# 阅读过的模块 & 涉及入口

```bash
/packages/react
├── README.md
├── index.classic.fb.js
├── index.experimental.js
├── index.js  # 主入口
├── index.modern.fb.js
├── index.stable.js
├── jsx-dev-runtime.js
├── jsx-runtime.js
├── npm
│   ├── index.js
│   ├── jsx-dev-runtime.js
│   ├── jsx-runtime.js
│   └── unstable-cache.js
├── package.json
├── src
│   ├── BadMapPolyfill.js
│   ├── IsSomeRendererActing.js
│   ├── React.js  # 内部透出入口
│   ├── ReactBaseClasses.js  # React.Component&React.PureComponent
│   ├── ReactBlock.js
│   ├── ReactChildren.js
│   ├── ReactContext.js  # React.createContext
│   ├── ReactCreateRef.js
│   ├── ReactCurrentBatchConfig.js
│   ├── ReactCurrentDispatcher.js
│   ├── ReactCurrentOwner.js
│   ├── ReactDebugCurrentFrame.js
│   ├── ReactElement.js  # React.createElement
│   ├── ReactElementValidator.js
│   ├── ReactForwardRef.js
│   ├── ReactFundamental.js
│   ├── ReactHooks.js
│   ├── ReactLazy.js
│   ├── ReactMemo.js  # React.memo
│   ├── ReactMutableSource.js
│   ├── ReactNoopUpdateQueue.js  # React.Component&React.PureComponent
│   ├── ReactSharedInternals.js
│   ├── ReactStartTransition.js
│   ├── __tests__
│   │   ├── ReactCache-test.js
│   │   ├── ReactChildren-test.js
│   │   ├── ReactClassEquivalence-test.js
│   │   ├── ReactCoffeeScriptClass-test.coffee
│   │   ├── ReactContextValidator-test.js
│   │   ├── ReactCreateRef-test.js
│   │   ├── ReactDOMTracing-test.internal.js
│   │   ├── ReactES6Class-test.js
│   │   ├── ReactElement-test.js
│   │   ├── ReactElementClone-test.js
│   │   ├── ReactElementJSX-test.js
│   │   ├── ReactElementValidator-test.internal.js
│   │   ├── ReactJSXElement-test.js
│   │   ├── ReactJSXElementValidator-test.js
│   │   ├── ReactProfiler-test.internal.js
│   │   ├── ReactProfilerDOM-test.internal.js
│   │   ├── ReactProfilerDevToolsIntegration-test.internal.js
│   │   ├── ReactPureComponent-test.js
│   │   ├── ReactStrictMode-test.js
│   │   ├── ReactTypeScriptClass-test.ts
│   │   ├── __snapshots__
│   │   │   └── ReactProfiler-test.internal.js.snap
│   │   ├── createReactClassIntegration-test.js
│   │   ├── forwardRef-test.internal.js
│   │   ├── forwardRef-test.js
│   │   ├── onlyChild-test.js
│   │   └── testDefinitions
│   │       ├── PropTypes.d.ts
│   │       ├── React.d.ts
│   │       └── ReactDOM.d.ts
│   ├── cache
│   │   └── ReactCache.js
│   ├── forks
│   │   ├── ReactCurrentDispatcher.www.js
│   │   ├── ReactCurrentOwner.www.js
│   │   └── ReactSharedInternals.umd.js
│   └── jsx
│       ├── ReactJSX.js
│       ├── ReactJSXElement.js
│       └── ReactJSXElementValidator.js
└── unstable-cache.js
```
