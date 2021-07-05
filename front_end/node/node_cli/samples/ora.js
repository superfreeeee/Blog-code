const ora = require('ora')

const spinner = ora()

function test(tag, type, ms) {
  return new Promise((resolve, reject) => {
    spinner.start(tag)

    setTimeout(() => {
      spinner[type](`${tag} ${type}`)

      resolve()
    }, ms)
  })
}

test('test 1', 'succeed', 1000)
  .then(() => {
    return test('test 2', 'fail', 1000)
  })
  .then(() => {
    spinner.start('123')
    setTimeout(() => {
      spinner.text = '456'
      setTimeout(() => {
        spinner.text = '789'
        spinner.stopAndPersist()
      }, 1000)
    }, 1000)
  })
