console.log('index.js')

const blue1 = '#3399FF'
const blue2 = '#3366FF'

window.onload = function () {
  console.log('window loaded')

  const canvas = document.querySelector('#canvas')
  const canvasWidth = canvas.width = 500
  const canvasHeight = canvas.height = 500

  let xOffset = 0
  const speed = 0.1
  const offsetLimit = Math.PI * 2

  const ctx = canvas.getContext('2d')
  drawCircle(ctx)
  requestAnimationFrame(draw)

  function draw () {
    // console.log(xOffset)
    // 清空画布
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    // 重绘
    ctx.fillStyle = blue1
    ctx.strokeStyle = blue1
    drawSin(ctx, xOffset, 3, 0.03, 12)
    ctx.fillStyle = blue2
    ctx.strokeStyle = blue2
    drawSin(ctx, xOffset, 0, 0.05, 15)
    // 移动位置并递归调用
    xOffset += speed
    if (xOffset > offsetLimit) {
      xOffset -= offsetLimit
    }
    requestAnimationFrame(draw)
  }

  function drawSin (ctx, xOffset = 0, yOffset = 0, waveWidth = 0.05, waveHeight = 20) {
    const points = []
    const startX = 0

    ctx.beginPath()
    for (let x = startX ; x < startX + canvasWidth ; x += 20 / canvasWidth) {
      let y = waveHeight * (1 - Math.sin((startX + x) * waveWidth + xOffset))
      y += canvasHeight / 2 + yOffset
      points.push([x, y])
      ctx.lineTo(x, y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(...points[0])
    ctx.stroke()
    ctx.fill()
  }

  function drawCircle (ctx) {
    const r = canvasWidth / 2
    const lineWidth = 10
    const cR = r - lineWidth
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(r, r, cR, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.clip()
  }

}


