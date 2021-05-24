<!-- TOC -->

- [源码包结构](#源码包结构)
  - [`/src` 源码包](#src-源码包)
    - [`/src/compiler` 编译器相关](#srccompiler-编译器相关)
    - [`/src/core` 源码核心](#srccore-源码核心)
      - [`/src/core/global-api` 全局 API](#srccoreglobal-api-全局-api)
      - [`/src/core/instance` Vue 实例](#srccoreinstance-vue-实例)
    - [`/src/platforms` 平台相关](#srcplatforms-平台相关)

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

### `/src/compiler` 编译器相关

```bash
/src/compiler
├── codegen             # 代码生成阶段(第三步骤)
├── parser              # 解析阶段(第一步骤)
├── directives
├── codeframe.js
├── create-compiler.js  # createCompilerCreator 方法(用于创建 createCompiler 方法)
├── error-detector.js
├── helpers.js          # AST 元素操作辅助函数
├── index.js            # 编译器入口
├── optimizer.js        # 优化阶段(第二步骤)
└── to-function.js      # createCompileToFunctionFn 方法(将 compile 结果 render 转化为函数)
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
├── vdom        # 虚拟 dom 相关
└── util        # 工具函数
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

### `/src/platforms` 平台相关

```bash
/src/platforms
├── web                                 # 浏览器平台相关
│   ├── compiler                        # 编译器入口
│   ├── runtime                         # 运行时入口
│   ├── server
│   ├── util
│   ├── entry-compiler.js               # 编译入口
│   ├── entry-runtime-with-compiler.js  # 编译 + 运行时入口
│   ├── entry-runtime.js                # 运行时入口
│   ├── entry-server-basic-renderer.js
│   └── entry-server-renderer.js
└── weex                                # 移动端平台(Weex)相关
    ├── compiler
    ├── entry-compiler.js
    ├── entry-framework.js
    ├── entry-runtime-factory.js
    ├── runtime
    └── util
```
