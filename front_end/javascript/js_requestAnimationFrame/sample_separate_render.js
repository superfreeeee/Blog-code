const setRender = (offset) => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)

  let w = 0
  const render = () => {
    // console.log(timestamp)
    const hasNext = w < maxWidth
    if (hasNext) {
      w += offset
      text.style.width = `${w}px`
    }
    return hasNext
  }
  return render
}

const startAnimation = (render, period = null) => {
  console.log('start animation')
  let hasNext = true
  let renderWrapper
  if (period) {
    let lastTime = performance.now()
    console.log(`start time = ${lastTime}`)
    renderWrapper = (timestamp) => {
      if (timestamp - lastTime > period) {
        console.log(`do at = ${timestamp}`)
        hasNext = render()
        lastTime = timestamp
      }
      if (hasNext) {
        requestAnimationFrame(renderWrapper)
      } else {
        console.log('animation finished')
      }
    }
  } else {
    renderWrapper = (timestamp) => {
      console.log(`do at = ${timestamp}`)
      hasNext = render()
      if (hasNext) {
        requestAnimationFrame(renderWrapper)
      } else {
        console.log('animation finished')
      }
    }
  }
  requestAnimationFrame(renderWrapper)
}

startAnimation(setRender(5), 50)
