const [period, offset] = [50, 5]

const start = (period, offset) => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)

  let w = 0
  let lastTime = performance.now()
  console.log(`start time = ${lastTime}`)
  let id = null
  const render = (timestamp) => {
    // console.log(timestamp)
    if (w < maxWidth) {
      if (timestamp - lastTime > period) {
        console.log(`do at = ${timestamp}`)
        w += offset
        text.style.width = `${w}px`
        lastTime = timestamp
      }
      id = requestAnimationFrame(render)
    } else {
      console.log('animation finished')
    }
  }
  id = requestAnimationFrame(render)
  return () => {
    console.log(`cancel at ${performance.now()}`)
    cancelAnimationFrame(id)
  }
}

const cancel = start(50, 5)
setTimeout(cancel, 1000)
