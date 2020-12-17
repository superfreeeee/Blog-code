window.onload = function () {
  const canvas = document.querySelector('#canvas')
  const canvasWidth = canvas.width = 500
  const canvasHeight = canvas.height = 500
  
  // 记录当前偏移量
  let xOffset = 0
  // 偏移量移动速度间距，60 帧/s -> 一秒移动 6
  const speed = 0.1

  requestAnimationFrame(draw)

  // 每帧进行重绘
  function draw () {
    const ctx = canvas.getContext('2d')
    // 清除上一帧的图形
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    // 图形重绘
    drawSin(ctx, xOffset)
    // 递归调用 -> 等到下一帧进行重绘
    xOffset += speed
    requestAnimationFrame(draw)
  }

  function drawSin (ctx, xOffset) {
    const points = []
    const startX = 0
    const waveWidth = 0.05
    const waveHeight = 20

    ctx.beginPath()
    for (let x = startX ; x < startX + canvasWidth ; x += 20 / canvasWidth) {
      // a * sin(b * x) -> a * sin(b * x + c)
      let y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset)
      y += canvasHeight / 2
      points.push([x, y])
      ctx.lineTo(x, y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(...points[0])
    ctx.stroke()
  }
}