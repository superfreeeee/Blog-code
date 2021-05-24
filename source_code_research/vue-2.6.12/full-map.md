# Vue 源码全地图

## src

```bash
/src
├── compiler # 编译器相关
│   ├── codegen
│   │   ├── events.js
│   │   └── index.js                   # touch
│   ├── parser
│   │   ├── entity-decoder.js
│   │   ├── filter-parser.js
│   │   ├── html-parser.js             # touch
│   │   ├── index.js                   # touch
│   │   └── text-parser.js             # touch
│   ├── directives
│   │   ├── bind.js
│   │   ├── index.js
│   │   ├── model.js
│   │   └── on.js
│   ├── codeframe.js
│   ├── create-compiler.js             # touch
│   ├── error-detector.js
│   ├── helpers.js                     # touch
│   ├── index.js                       # touch
│   ├── optimizer.js                   # touch
│   └── to-function.js                 # touch
├── core # 源码核心
│   ├── components
│   │   ├── index.js                   # touch
│   │   └── keep-alive.js
│   ├── global-api
│   │   ├── assets.js
│   │   ├── extend.js                  # touch
│   │   ├── index.js                   # touch
│   │   ├── mixin.js                   # touch
│   │   └── use.js                     # touch
│   ├── instance
│   │   ├── render-helpers
│   │   │   ├── bind-dynamic-keys.js
│   │   │   ├── bind-object-listeners.js
│   │   │   ├── bind-object-props.js
│   │   │   ├── check-keycodes.js
│   │   │   ├── index.js
│   │   │   ├── render-list.js
│   │   │   ├── render-slot.js
│   │   │   ├── render-static.js
│   │   │   ├── resolve-filter.js
│   │   │   ├── resolve-scoped-slots.js
│   │   │   └── resolve-slots.js
│   │   ├── events.js                  # touch
│   │   ├── index.js                   # touch
│   │   ├── init.js                    # touch
│   │   ├── inject.js                  # touch
│   │   ├── lifecycle.js               # touch
│   │   ├── proxy.js                   # touch
│   │   ├── render.js                  # touch
│   │   └── state.js                   # touch
│   ├── observer # 观察者相关(响应式原理)
│   │   ├── array.js                   # touch
│   │   ├── dep.js                     # touch
│   │   ├── index.js                   # touch
│   │   ├── scheduler.js               # touch
│   │   ├── traverse.js                # touch
│   │   └── watcher.js                 # touch
│   ├── util # 工具函数相关
│   │   ├── debug.js
│   │   ├── env.js                     # touch
│   │   ├── error.js
│   │   ├── index.js                   # touch
│   │   ├── lang.js                    # touch
│   │   ├── next-tick.js               # touch
│   │   ├── options.js
│   │   ├── perf.js
│   │   └── props.js
│   ├── vdom # 虚拟 dom 相关
│   │   ├── helpers
│   │   │   ├── extract-props.js
│   │   │   ├── get-first-component-child.js
│   │   │   ├── index.js                        # touch
│   │   │   ├── is-async-placeholder.js
│   │   │   ├── merge-hook.js
│   │   │   ├── normalize-children.js
│   │   │   ├── normalize-scoped-slots.js
│   │   │   ├── resolve-async-component.js
│   │   │   └── update-listeners.js             # touch
│   │   ├── modules
│   │   │   ├── directives.js          # touch
│   │   │   ├── index.js               # touch
│   │   │   └── ref.js
│   │   ├── create-component.js        # touch
│   │   ├── create-element.js          # touch
│   │   ├── create-functional-component.js
│   │   ├── patch.js                   # touch
│   │   └── vnode.js                   # touch
│   ├── config.js                      # touch
│   └── index.js                       # touch
├── platforms
│   ├── web
│   │   ├── compiler
│   │   │   ├── directives
│   │   │   │   ├── html.js
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── text.js
│   │   │   ├── modules
│   │   │   │   ├── class.js
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── style.js
│   │   │   ├── options.js              # touch
│   │   │   ├── util.js
│   │   │   └── index.js                # touch
│   │   ├── runtime
│   │   │   ├── components
│   │   │   │   ├── index.js
│   │   │   │   ├── transition-group.js
│   │   │   │   └── transition.js
│   │   │   ├── directives
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── show.js
│   │   │   ├── modules
│   │   │   │   ├── attrs.js            # touch
│   │   │   │   ├── class.js            # touch
│   │   │   │   ├── dom-props.js
│   │   │   │   ├── events.js
│   │   │   │   ├── index.js            # touch
│   │   │   │   ├── style.js            # touch
│   │   │   │   └── transition.js
│   │   │   ├── class-util.js
│   │   │   ├── node-ops.js             # touch
│   │   │   ├── index.js                # touch
│   │   │   ├── patch.js                # touch
│   │   │   └── transition-util.js
│   │   ├── server
│   │   │   ├── compiler.js
│   │   │   ├── directives
│   │   │   │   ├── index.js
│   │   │   │   ├── model.js
│   │   │   │   └── show.js
│   │   │   ├── modules
│   │   │   │   ├── attrs.js
│   │   │   │   ├── class.js
│   │   │   │   ├── dom-props.js
│   │   │   │   ├── index.js
│   │   │   │   └── style.js
│   │   │   └── util.js
│   │   ├── util
│   │   │   ├── attrs.js
│   │   │   ├── class.js
│   │   │   ├── compat.js
│   │   │   ├── element.js
│   │   │   ├── index.js
│   │   │   └── style.js
│   │   ├── entry-compiler.js               # touch
│   │   ├── entry-runtime-with-compiler.js  # touch
│   │   ├── entry-runtime.js                # touch
│   │   ├── entry-server-basic-renderer.js
│   │   └── entry-server-renderer.js
│   └── weex
│       ├── compiler
│       │   ├── directives
│       │   │   ├── index.js
│       │   │   └── model.js
│       │   ├── index.js
│       │   └── modules
│       │       ├── append.js
│       │       ├── class.js
│       │       ├── index.js
│       │       ├── props.js
│       │       ├── recycle-list
│       │       │   ├── component-root.js
│       │       │   ├── component.js
│       │       │   ├── index.js
│       │       │   ├── recycle-list.js
│       │       │   ├── text.js
│       │       │   ├── v-bind.js
│       │       │   ├── v-for.js
│       │       │   ├── v-if.js
│       │       │   ├── v-on.js
│       │       │   └── v-once.js
│       │       └── style.js
│       ├── entry-compiler.js
│       ├── entry-framework.js
│       ├── entry-runtime-factory.js
│       ├── runtime
│       │   ├── components
│       │   │   ├── index.js
│       │   │   ├── richtext.js
│       │   │   ├── transition-group.js
│       │   │   └── transition.js
│       │   ├── directives
│       │   │   └── index.js
│       │   ├── index.js
│       │   ├── modules
│       │   │   ├── attrs.js
│       │   │   ├── class.js
│       │   │   ├── events.js
│       │   │   ├── index.js
│       │   │   ├── style.js
│       │   │   └── transition.js
│       │   ├── node-ops.js
│       │   ├── patch.js
│       │   ├── recycle-list
│       │   │   ├── render-component-template.js
│       │   │   └── virtual-component.js
│       │   └── text-node.js
│       └── util
│           ├── element.js
│           ├── index.js
│           └── parser.js
├── server
│   ├── bundle-renderer
│   │   ├── create-bundle-renderer.js
│   │   ├── create-bundle-runner.js
│   │   └── source-map-support.js
│   ├── create-basic-renderer.js
│   ├── create-renderer.js
│   ├── optimizing-compiler
│   │   ├── codegen.js
│   │   ├── index.js
│   │   ├── modules.js
│   │   ├── optimizer.js
│   │   └── runtime-helpers.js
│   ├── render-context.js
│   ├── render-stream.js
│   ├── render.js
│   ├── template-renderer
│   │   ├── create-async-file-mapper.js
│   │   ├── index.js
│   │   ├── parse-template.js
│   │   └── template-stream.js
│   ├── util.js
│   ├── webpack-plugin
│   │   ├── client.js
│   │   ├── server.js
│   │   └── util.js
│   └── write.js
├── sfc
│   └── parser.js
└── shared
    ├── constants.js
    └── util.js
```

## types

```bash
types
├── index.d.ts
├── options.d.ts
├── plugin.d.ts
├── test
│   ├── augmentation-test.ts
│   ├── es-module.ts
│   ├── options-test.ts
│   ├── plugin-test.ts
│   ├── ssr-test.ts
│   ├── tsconfig.json
│   ├── umd-test.ts
│   └── vue-test.ts
├── tsconfig.json
├── typings.json
├── umd.d.ts
├── vnode.d.ts
└── vue.d.ts
```
