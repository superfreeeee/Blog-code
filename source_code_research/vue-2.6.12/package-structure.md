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
├── config.js   # 配置选项
├── index.js    # Vue 实例导出入口
├── components  # keep alive 组件
├── global-api  # 全局 API
├── instance    # Vue 实例
├── observer    # 观察者相关
├── util        # 工具函数
└── vdom        # 虚拟 dom 相关
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
├── events.js       # 事件相关方法
├── index.js        # Vue 实例入口
├── init.js         # 初始化相关方法
├── inject.js       # 注入相关方法
├── lifecycle.js    # 生命周期相关方法
├── proxy.js        # 渲染代理相关方法
├── render.js       # 渲染相关方法
├── state.js        # 状态相关方法
└── render-helpers  # 渲染辅助函数
```