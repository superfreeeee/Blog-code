window.onload = function () {
  // 获取 canvas 上下文
  const canvas = document.querySelector('#canvas')
  const canvasWidth = canvas.width = 500
  const canvasHeight = canvas.height = 500
  const ctx = canvas.getContext('2d')
  
  drawSin(ctx)

  function drawSin (ctx) {
    const points = []
    const startX = 0
    const waveWidth = 0.05
    const waveHeight = 20

    ctx.beginPath()
    for (let x = startX ; x < startX + canvasWidth ; x += 20 / canvasWidth) {
      // 计算高度
      let y = waveHeight * Math.sin((startX + x) * waveWidth)
      y += canvasHeight / 2 // 置于图中线
      points.push([x, y])
      ctx.lineTo(x, y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(...points[0])
    ctx.stroke()
  }
}