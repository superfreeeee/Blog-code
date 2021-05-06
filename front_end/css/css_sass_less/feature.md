<!-- TOC -->

- [Less & Sass/Scss 特性](#less--sassscss-特性)
  - [Less](#less)
    - [基础特性](#基础特性)
    - [进阶/详细特性](#进阶详细特性)
  - [Sass/Scss](#sassscss)
    - [详细特性](#详细特性)
  - [共有特性：博客介绍](#共有特性博客介绍)

<!-- /TOC -->

# Less & Sass/Scss 特性

## Less

### 基础特性

- 变量（Variables）
- 混合（Mixins）
- 嵌套（Nesting）
- 运算（Operations）
- 转义（Escaping）
- 函数（Functions）
- 命名空间和访问符
- 映射（Maps）
- 作用域（Scope）
- 注释（Comments）
- 导入（Importing）

### 进阶/详细特性

- 变量(Variables)
  - Interpolation 字符串替换
    - value 作为属性值：`color: @link-color;`
    - selector 作为选择器名称：`.@{my-selector} {/* ... */}`
    - URLs 插入URL：`background: url("@{images}/white-sand.png");`
    - Import 插入Import路径：`@import "@{themes}/tidal-wave.less";`
    - Properties 作为属性名：`@{property}: #0ee;`
  - Variable Variables 作为引用变量名：`color: @@color;`
  - Lazy Evaluation 惰性求值(动态绑定/传递引用)：`@var: @a;`
  - Properties as Variables 其他属性作为变量：`background-color: $color;`
- 父选择器(Parent Selectors)
  - Multiple 复用父选择器(父选择器多次出现)：`& + &`
  - Changing Selector Order 改变顺序：`.no-borderradius &`
  - Combinatorial Explosion 组合爆炸(附带所有可能组合)：`p, a, ul, li { & + & {/* ... */}}`
- 继承(Extend)
  - Basic 普通继承：`&:extend(.b);`
  - Syntax 语法/特殊标识：`.a:extend(.b)`、`.c:extend(.d all)`
  - Exact Matching 精准匹配(指明选择器、伪类顺序、不匹配变量作为选择器的选择器)
- 混合(Mixins)
  - Not Outputing 不输出变量：`.my-other-mixin()`
  - Namespaces 命名空间：`#group { .inner() {} }`
  - Guarded Namespaces 带守卫命名空间：`#group when (condition)`
  - Parametric Mixins 带参数混合：`.border-radius(@radius)`、`.border-radius(@radius: 5px)`
  - Pattern-Matching 模式匹配：`.mixin(dark; @color) {} .mixin(light; @color) {} .mixin(@switch; #888);`
  - Using as Function 作为函数：`.average(@x, @y) { @result: ((@x + @y) / 2); }`
  - Recursive Mixins 递归混合：`.loop(@counter) when (@counter > 0) { .loop((@count - 1)); }`
  - Mixin Guards 混合守卫：`.mixin(@a) when (condition)`
  - Aliasing Mixins 混合别名
- CSS Guards 原生CSS守卫：`tag when (condition)`、`& when (condition)`
- Detached Ruleset 样式集合：`@ruleset: {};`
- @import At-Rules
- @plugins At-Rules
- Map 映射表：`@ruleset[option]`
- Functions 函数手册
  - Logical Functions 逻辑函数
    - if 逻辑判断
    - boolean 保存布尔值
  - String Functions 字符串函数
    - escape/e 转义
    - % format 格式化
    - replace
  - List Functions 列表函数
    - length
    - extract
    - range
    - each
  - Math Functions 数学函数
  - Type Functions 类型函数
    - isnumber
    - isstring
    - iscolor
    - iskeyword
    - isurl
    - ispixel
    - ...
  - Misc Functions 抽取函数
    - color
    - image-size
    - unit
    - ...
  - Color Definition Functions 颜色生成函数
    - rgb
    - rgba
    - argb
    - hsl
    - hsla
    - hsv
    - hsva
  - Color Channel Functions 颜色管道函数
    - hua
    - saturation
    - lightness
    - hsvhue
    - hsvsaturation
    - hsvvalue
    - red
    - green
    - blue
    - alpha
    - luma
    - luminance
  - Color Operation Functions 颜色操作函数
    - saturate
    - desaturate
    - lighten
    - darken
    - fadein
    - fadeout
    - fade
    - spin
    - mix
    - tint
    - shade
    - greyscale
    - contrast
  - Color Blending Functions 颜色调和函数
    - multiply
    - screen
    - overlay
    - softlight
    - hardlight
    - difference
    - exclusion
    - average
    - negation

## Sass/Scss

### 详细特性

- CSS 扩展 CSS Extension
  - 嵌套 Nested Rules：`#outer { #inner {} }`
  - 父选择器 &：`&:hover`
  - 属性嵌套 Nested Properties：`font: { size, weight }`
- 注释
  - 单行注释(忽略)：`//`
  - 多行注释：`/* ... */`
- Sass 脚本 Sass Script
  - 变量 \$：`$width: 100px;`
  - 数据类型 Data Type
    - 数字 `1, 2, 13, 10px`
    - 字符串 `"foo", 'bar', baz`
    - 颜色 `blue, #xxx`
    - 布尔值 `true, false`
    - 空值 `null`
    - 数组 `a b , c, d`
    - maps `(key: value, key: value)`
  - 运算 Operations
    - 数字运算 `+ - * /`
    - 颜色运算 `+ * fn`
    - 字符串运算 `+ #{}`
    - 布尔运算 `and or not`
    - 数组运算 `fn`
  - 函数 Functions
    - 关键词函数 `hsl($hue, $saturation, $lightness)`
    - 插值 `#{}`
    - 选择器子棉量 `key: &`
- 混合指令 Mixin Directives
  - 定义 @mixin `@mixin name {}`
  - 使用混入 @include `{ @include name }`
  - 使用参数 `@mixin name($var1, $var2)` + `{ @include name(value) }`
  - 混合样式扩展 `@mixin name { @content }` + `@include name { ... }`
  - 缩写 `@mixin -> '='`、`@include -> '+'`
- 控制指令 Control Directives
  - if()
  - @if
  - @for
  - @each
  - @while
- 函数指令 Function Directives
  - `@function name(value) { @return value; }` + `{ key: name(value); }`
- @-Rules 指令
  - @import 导入脚本 `@import "foo.scss";`、`@import url()`、`@import url(#{})`
  - @media
  - @extend 继承 `.outer { @extend .inner }`
    - @extend-Only 不输出选择器 `selector%extreme` + `@extend %extreme`
  - @at-root
  - @debug
  - @warn
- 输出格式
  - `:nested` 嵌套缩进风格
  - `:expanded` 展开(普通 css)
  - `:compact` 单行
  - `:compressed` 紧密

## 共有特性：博客介绍

- 变量(Variables)
  - value
  - key
  - selector
- 嵌套(Nesting)
  - basic
  - &
- 混合(Mixins)
  - basic
  - parametric
  - not output
- 继承(Extensions)
  - basic
  - not output
- 运算(Operations)/函数(Functions)
  - 数字
  - 字符串
  - 颜色
  - 内置函数
  - 自定义函数
- 控制指令(Control Directives)
  - 条件判断 if
  - 循环 for each
- 注释(Comments)
  - //
  - /*  */
- 导入(Importing)
  - @import

