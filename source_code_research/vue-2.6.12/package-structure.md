<!-- TOC -->

- [源码包结构](#源码包结构)
  - [`/src` 源码包](#src-源码包)
    - [`/src/core` 源码核心](#srccore-源码核心)
      - [`/src/core/global-api` 全局 API](#srccoreglobal-api-全局-api)
      - [`/src/core/instance` Vue 实例](#srccoreinstance-vue-实例)

<!-- /TOC -->

# 源码包结构

## `/src` 源码包

```bash
/src
├── compiler    # 编译器相关
├── core        # 源码核心
├── platforms   # 运行平台相关
├── server      #
├── sfc
└── shared      # 共享代码
```

### `/src/core` 源码核心

```bash
/src/core
├── config.js
├── index.js    # Vue 实例导出入口
├── components
├── global-api  # 全局 API
├── instance    # Vue 实例
├── observer
├── util
└── vdom
```

#### `/src/core/global-api` 全局 API

```bash
/src/core/global-api
├── assets.js
├── extend.js
├── index.js
├── mixin.js
└── use.js
```

#### `/src/core/instance` Vue 实例

```bash
/src/core/instance
├── events.js
├── index.js
├── init.js
├── inject.js
├── lifecycle.js
├── proxy.js
├── render-helpers
├── render.js
└── state.js
```