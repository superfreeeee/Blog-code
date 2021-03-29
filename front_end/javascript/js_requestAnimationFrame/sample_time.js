const [period, offset] = [50, 5]

const start = (period, offset) => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)

  let w = 0
  let lastTime = performance.now()
  console.log(`start time = ${lastTime}`)
  const render = (timestamp) => {
    if (w < maxWidth) {
      if (timestamp - lastTime > period) {
        console.log(`do at = ${timestamp}`)
        w += offset
        text.style.width = `${w}px`
        lastTime = timestamp
      }
      requestAnimationFrame(render)
    } else {
      console.log('animation finished')
    }
  }
  requestAnimationFrame(render)
}

document.querySelector('.btn').addEventListener('click', () => {
  start(50, 5)
})
