const start = () => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)

  let w = 0
  const renderId = setInterval(() => {
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 10000; j++) {
        const k = i * j
      }
    }
    if (w < maxWidth) {
      console.log(`do at ${performance.now()}`)
      w++
      text.style.width = `${w}px`
    } else {
      console.log('animation finished')
      clearInterval(renderId)
    }
  }, 16)
}

start()
