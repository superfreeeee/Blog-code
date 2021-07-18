# Code Lint 代码检查：操作手册

- 涉及工具
  - `prettier` 代码格式化
  - `commitlint` git提交信息检查
  - `eslint` ts 代码检查
  - `stylelint` scss 代码检查
  - `husky` git hook 接入
  - `lint-staged` staged 阶段检查

## 0. 项目初始化

```bash
$ yarn init -y
$ git init
```

## 1. Prettier

- 安装依赖

```bash
$ yarn add prettier -D
```

- 配置文件：`.prettierrc.json`、直接写在 `package.json` 里面

```json
{
  "prettier": {
    "singleQuote": true,
    "semi": true
  }
}
```

- 运行命令

```bash
$ yarn prettier src/* --write
```

## 2. commitlint

- 安装依赖

```bash
$ yarn add @commitlint/{cli,config-conventional} -D
```

- 配置文件：`commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

- 运行命令

```bash
$ echo 'test1'      | yarn commitlint
$ echo 'tag: test2' | yarn commitlint
$ echo 'ci: test3'  | yarn commitlint
```

## 3. eslint

- 安装依赖

```bash
$ yarn add eslint -D
```

- 初始化配置：生成 `.eslintrc.json`

```bash
$ yarn eslint --init
$ yarn add eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest typescript -D
```

- 运行命令

```bash
$ yarn eslint src/*
```

## 4. stylelint

- 安装依赖

```bash
$ yarn add stylelint stylelint-config-standard -D
```

- 配置文件：`.stylelintrc.json`

```json
{
  "extends": "stylelint-config-standard"
}
```

- 运行命令

```bash
$ yarn stylelint src/*.scss
```

## 5. husky

- 安装依赖

```bash
$ yarn add husky -D
```

- 初始化 & 创建 `commit-msg` 钩子加入 commitlint 校验

```bash
$ yarn husky install
$ yarn husky add .husky/commit-msg "yarn commitlint --edit \$1"
```

- 运行命令

```bash
$ git add .
$ git commit -m 'build: init project'
```

## 6. lint-staged

- 安装依赖

```bash
$ yarn add lint-staged -D
```

- 创建 `pre-commit` 钩子执行 lint-staged

```bash
$ yarn husky add .husky/pre-commit "yarn lint-staged"
```

- package.json 中配置校验规则

```json
{
  "lint-staged": {
    "*.json": [
      "prettier --write"
    ],
    "*.{js,ts}": [
      "prettier --write",
      "yarn eslint --fix"
    ],
    "*.{css,less,scss}": [
      "prettier --write",
      "yarn stylelint --fix"
    ]
  },
}
```

- 运行命令

```bash
$ git add .
$ git commit -m 'test: use lint-staged'
```


