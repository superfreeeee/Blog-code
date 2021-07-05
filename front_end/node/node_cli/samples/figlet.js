const figlet = require('figlet')

figlet('Text 1', (err, text) => {
  console.log(text)
  console.log(figlet.textSync('Text 2', { font: 'Standard' }))
  console.log(figlet.textSync('Text 3', { font: 'Ghost' }))
  console.log(figlet.textSync('Text 4', { verticalLayout: 'fitted' }))
  console.log(figlet.textSync('Text 5', { verticalLayout: 'full' }))
})
