// const ProgressBar = require('progress')
const slog = require('single-line-log').stdout

const format = (s, len) => {
  return s.length >= len ? s : `${' '.repeat(len - s.length)}${s}`
}

// const bar = new ProgressBar('Progress [:bar] :current/:total', { total: 10 })

function ProgressBar(title = 'A Bar', total = 10, length = 25) {
  this.title = title
  this.length = length
  this.completed = 0
  this.total = total
  this.done = false
  this.barIcon = {
    filled: '█',
    empty: '░',
  }
}

ProgressBar.prototype.render = function (force) {
  if (this.done) return
  const num = Number(force)
  if (isNaN(num)) this.completed++
  else this.completed = num
  if (this.completed >= this.total) {
    this.completed = this.total
    this.done = true
  }

  const {
    title,
    completed,
    total,
    length,
    barIcon: { filled, empty },
  } = this

  const percent = (completed / total).toFixed(4)
  const filledNum = Math.floor(length * percent)
  const rest = length - filledNum

  const percentText = format((percent * 100).toFixed(2), 6)
  const barText = `${filled.repeat(filledNum)}${empty.repeat(rest)}`
  const completedText = `${completed}/${total}`
  const text = `${title}: ${percentText} ${barText} ${completedText}`

  slog(text)
}

const bar = new ProgressBar('配置进度', 100, 30)

module.exports = ProgressBar
