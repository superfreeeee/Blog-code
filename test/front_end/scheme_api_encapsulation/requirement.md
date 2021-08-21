# API 封装技术方案需求

## 1. 基本需求

- 前端对接以下三种 API 接口

```
<!-- 接口一 -->
method: GET
path  : /
res   : 'hello world'

<!-- 接口二 -->
method: POST
path  : /create
body  : { type }
res   : { code, id }

type = 'increment' | 'reset'
code = 200, success, id 递增 or 重置

<!-- 接口三 -->
method: POST
path  : /error
body  : { success }
res   : { code, msg }

success = true  => code = 200, msg = 'success'
success = false => code = 500, msg = 'fail'
```

- 希望封装成上层能简单调用的形式

## 2. 进阶需求

- 能支持 mock 开发
- 支持切换服务端路由 / 支持同时请求多个不同的服务器

## 3. 约束

- js 版本开发
- 尽量将 api 全部封装到一个目录下，可以存在子目录
- （进阶）ts 版本

