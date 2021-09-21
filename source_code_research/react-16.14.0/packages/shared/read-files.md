# 阅读过的模块 & 涉及入口

```bash
/packages/shared
├── ConsolePatchingDev.js
├── ExecutionEnvironment.js
├── ReactComponentStackFrame.js
├── ReactElementType.js
├── ReactErrorUtils.js
├── ReactFeatureFlags.js  # 新特性启用标记
├── ReactInstanceMap.js
├── ReactSharedInternals.js
├── ReactSymbols.js  # typeof 用的 Symbols
├── ReactTypes.js
├── ReactVersion.js
├── __tests__
│   ├── ReactDOMFrameScheduling-test.js
│   ├── ReactError-test.internal.js
│   ├── ReactErrorProd-test.internal.js
│   ├── ReactErrorUtils-test.internal.js
│   ├── ReactSymbols-test.internal.js
│   └── describeComponentFrame-test.js
├── checkPropTypes.js
├── consoleWithStackDev.js
├── enqueueTask.js
├── forks
│   ├── ReactFeatureFlags.native-fb.js
│   ├── ReactFeatureFlags.native-oss.js
│   ├── ReactFeatureFlags.readonly.js
│   ├── ReactFeatureFlags.test-renderer.js
│   ├── ReactFeatureFlags.test-renderer.native.js
│   ├── ReactFeatureFlags.test-renderer.www.js
│   ├── ReactFeatureFlags.testing.js
│   ├── ReactFeatureFlags.testing.www.js
│   ├── ReactFeatureFlags.www-dynamic.js
│   ├── ReactFeatureFlags.www.js
│   ├── Scheduler.umd.js
│   ├── SchedulerTracing.umd.js
│   ├── consoleWithStackDev.www.js
│   ├── invokeGuardedCallbackImpl.www.js
│   ├── object-assign.inline-umd.js
│   └── object-assign.umd.js
├── formatProdErrorMessage.js
├── getComponentName.js
├── invariant.js  # 抛出内部异常 Internal React error
├── invokeGuardedCallbackImpl.js
├── isValidElementType.js
├── objectIs.js
├── package.json
└── shallowEqual.js
```
