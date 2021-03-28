const start = () => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)
  
  let w = 0
  const render = () => {
    if (w < maxWidth) {
      w++
      text.style.width = `${w}px`
      requestAnimationFrame(render)
    } else {
      console.log('animation finished')
    }
  }
  requestAnimationFrame(render)
}

start()
