window.onload = function () {
  const canvas = document.querySelector('#canvas')
  const canvasWidth = canvas.width = 500
  const canvasHeight = canvas.height = 500
  
  let xOffset = 0
  const speed = 0.1
  const blue1 = '#3399FF'
  const blue2 = '#3366FF'

  drawCircle()
  requestAnimationFrame(draw)

  function drawCircle () {
    const ctx = canvas.getContext('2d')
    const r = canvasWidth / 2
    const lineWidth = 10
    const cR = r - lineWidth
    ctx.fillStyle = '#000000'
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(r, r, cR, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.clip()
  }

  function draw () {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    // 背景的波浪
    ctx.strokeStyle = blue1
    ctx.fillStyle = blue1
    drawSin(ctx, xOffset, 3, 0.03, 12)
    // 前景的波浪
    ctx.strokeStyle = blue2
    ctx.fillStyle = blue2
    drawSin(ctx, xOffset, 0, 0.05, 15)
    xOffset += speed
    requestAnimationFrame(draw)
  }

  // 添加后参数：画布上下文、水平偏移量、垂直偏移量、波浪周期、波浪高度
  function drawSin (ctx, xOffset = 0, yOffset = 0, waveWidth = 0.05, waveHeight = 20) {
    const points = []
    const startX = 0

    ctx.beginPath()
    for (let x = startX ; x < startX + canvasWidth ; x += 20 / canvasWidth) {
      let y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset)
      y += canvasHeight / 2 - yOffset // 添加垂直偏移量
      points.push([x, y])
      ctx.lineTo(x, y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(...points[0])
    ctx.stroke()
    ctx.fill()
  }
}