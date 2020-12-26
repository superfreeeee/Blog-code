;(function _init () {
  const nums = new Array(10).fill(0).map((val, idx) => idx)
  const letters = new Array(26).fill(0).map((val, idx) => String.fromCharCode('a'.charCodeAt() + idx))

  function GVerify ({ el, size = 4, type = 'blend' }) {
    this.options = {
      el: document.querySelector(el),
      size,
      type,
      canvasId: `_canvas_${el}`,
      code: '',
      txts: type === 'number' ? nums : type === 'letter' ? letters : [ ...nums, ...letters ]
    }
    if (!this.options.el) throw new Error('container not found')
    this.init()
    this.refresh()
  }

  GVerify.prototype.init = function () {
    const container = this.options.el
    const canvas = document.createElement('canvas')
    canvas.id = this.options.canvasId
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    canvas.style.cursor = 'pointer'
    canvas.innerHTML = '您的的浏览器不支持 canvas'
    container.appendChild(canvas)
    const self = this
    canvas.onclick = function () {
      self.refresh()
    }
  }

  GVerify.prototype.refresh = function () {
    const canvas = document.getElementById(this.options.canvasId)
    const { width, height } = canvas
    const { size, txts } = this.options
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.textBaseline = 'middle'
    ctx.fillStyle = randomColor(180, 240)
    ctx.fillRect(0, 0, width, height)

    /* 绘制验证码 */
    this.options.code = ''
    for (let i = 0; i < size; i++) {
      const c = txts[randomInt(0, txts.length)]
      this.options.code += c
      ctx.font = `${randomInt(height / 2, height)}px Simhei`
      ctx.fillStyle = randomColor(50, 160)
      ctx.shadowOffsetX = randomInt(-3, 3)
      ctx.shadowOffsetY = randomInt(-3, 3)
      ctx.shadowBlur = randomInt(-3, 3)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      const x = randomInt(width / size * i, width / size * (i + 0.8))
      const y = height / 2
      const degree = randomInt(-30, 30)
      /* 改变坐标系 */
      ctx.translate(x, y) // 原点
      ctx.rotate(degree * Math.PI / 180) // 旋转
      /* 填上数字 */

      ctx.fillText(c, 0, 0)
      /* 恢复坐标系 */
      ctx.rotate(-degree * Math.PI / 180)
      ctx.translate(-x, -y)
    }
    /* 绘制干扰线 */
    const lineCount = randomInt(4, 8)
    for (let i = 0; i < lineCount; i++) {
      ctx.strokeStyle = randomColor(40, 180)
      ctx.beginPath()
      ctx.moveTo(randomInt(0, width), randomInt(0, height))
      ctx.lineTo(randomInt(0, width), randomInt(0, height))
      ctx.stroke()
    }

    /* 绘制干扰点 */
    const pointCount = randomInt(width / 4, width / 2)
    for (let i = 0; i < pointCount; i++) {
      ctx.fillStyle = randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(randomInt(0, width), randomInt(0, height), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  GVerify.prototype.validate = function (code) {
    console.log(`expected: ${this.options.code}, actual: ${code}`)
    return code === this.options.code
  }

  function randomInt (from = 0, to = 1) {
    return Math.floor(from + Math.random() * (to - from))
  }

  function randomColor (min = 0, max = 255) {
    const [ r, g, b ] = [ randomInt(min, max), randomInt(min, max), randomInt(min, max) ]
    return `rgb(${r},${g},${b})`
  }

  window.GVerify = GVerify
})()
