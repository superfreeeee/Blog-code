window.onload = function () {
  const canvas = document.querySelector('#canvas')
  const canvasWidth = canvas.width = 500
  const canvasHeight = canvas.height = 500
  
  let xOffset = 0
  const speed = 0.1
  const blue1 = '#3399FF'

  drawCircle() // 初始化切边圆形
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = blue1 // 以蓝色填满
  ctx.fillStyle = blue1 // 以蓝色填满
  requestAnimationFrame(draw)

  function drawCircle () {
    const ctx = canvas.getContext('2d')
    const r = canvasWidth / 2
    const lineWidth = 10
    const cR = r - lineWidth
    ctx.fillStyle = '#000000' // 黑边
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    // 画圆并切边
    ctx.arc(r, r, cR, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.clip()
  }

  function draw () {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    drawSin(ctx, xOffset)
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
      let y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset)
      y += canvasHeight / 2
      points.push([x, y])
      ctx.lineTo(x, y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(...points[0])
    ctx.stroke()
    // 图形填满颜色
    ctx.fill()
  }
}