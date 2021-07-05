const chalk = require('chalk')

// 改变颜色
console.log(chalk.cyan('Color Text'))
console.log(chalk.bgCyan('Background Color Text'))

// 文字修饰
console.log(chalk.bold('Bold Text'))
console.log(chalk.italic('Italic Text'))
console.log(chalk.underline('Underline Text'))

console.log(chalk.dim('Dim Text'))
console.log(chalk.dim(chalk.cyan('Dim cyan Text')))
console.log(chalk.inverse('Inverse Text'))
