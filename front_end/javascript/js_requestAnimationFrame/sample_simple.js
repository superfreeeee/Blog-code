const start = () => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)

  let w = 0
  const render = () => {
    if (w < maxWidth) {
      console.log(`do at ${performance.now()}`)
      w += 5
      text.style.width = `${w}px`
      requestAnimationFrame(render)
    } else {
      console.log('animation finished')
    }
  }
  requestAnimationFrame(render)
}

document.querySelector('.btn').addEventListener('click', start)
