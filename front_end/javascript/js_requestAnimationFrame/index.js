class AnimationController {
  constructor(render, reset, period = null) {
    this.render = render
    this.period = period
    this.reset = reset
  }

  setRender(render = () => {}) {
    this.render = render
  }

  setPeriod(period = null) {
    this.period = period
  }

  start() {
    const { render, period } = this
    this.stop()
    this.reset()
    this.hasNext = true

    const next = (hasNext) => {
      if (hasNext) {
        this.animationId = requestAnimationFrame(this.renderWrapper)
      } else {
        console.log('animation finished')
        this.animationId = null
      }
    }

    if (period) {
      let lastTime = performance.now() - period
      this.renderWrapper = (timestamp) => {
        if (timestamp - lastTime > period) {
          console.log(`do at = ${timestamp}`)
          this.hasNext = render()
          lastTime = timestamp
        }
        next(this.hasNext)
      }
    } else {
      this.renderWrapper = (timestamp) => {
        console.log(`do at = ${timestamp}`)
        this.hasNext = render()
        next(this.hasNext)
      }
    }
    this.animationId = requestAnimationFrame(this.renderWrapper)
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(animationId)
      this.animationId = null
    }
  }
}

const createRender = (offset) => {
  const text = document.querySelector('.text')
  const maxWidth = /[0-9]*/.exec(getComputedStyle(text).width)

  let w = 0
  const render = () => {
    const hasNext = w < maxWidth
    if (hasNext) {
      w += offset
      text.style.width = `${w}px`
    }
    return hasNext
  }
  const reset = () => {
    w = 0
  }
  return [render, reset]
}

const controller = new AnimationController(...createRender(10), 50)
controller.start()

console.log(controller)
window.controller = controller
window.start = controller.start.bind(controller)
window.stop = controller.stop.bind(controller)
window.reset = controller.reset
