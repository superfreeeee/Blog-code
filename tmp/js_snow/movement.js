function randInt(from = 0, to = 1) {
  return Math.floor(from + Math.random() * (to - from))
}

function rand(from = 0, to = 1) {
  return from + Math.random() * (to - from)
}

class Snow {
  constructor(options = {}) {
    this.el = null
    this.d = 0 // 直径 diameter
    this.maxDiameter = options.maxDiameter || 80 // 最大直径
    this.minDiameter = options.minDiameter || 2 // 最小直径
    this.opacity = 0 // 透明度
    this.x = 0 // 左偏移量
    this.y = 0 // 右边偏移量
    this.sx = 0 // 水平速度
    this.sy = 0 // 垂直速度
    this.maxSpeed = options.maxSpeed || 4 // 最大速度
    this.minSpeed = options.minSpeed || 1 // 最小速度
    this.windowWidth = window.innerWidth // 窗口宽度
    this.windowHeight = window.innerHeight // 窗口高度
    // 初始化雪花
    this.init()
  }

  init() {
    const {
      minDiameter,
      maxDiameter,
      d,
      windowWidth,
      windowHeight,
      maxSpeed,
      minSpeed,
    } = this
    this.d = randInt(minDiameter, maxDiameter)
    this.opacity = Math.random()
    this.x = randInt(d, windowWidth - d)
    this.y = randInt(d, windowHeight - d)
    this.sy = rand(minSpeed, maxSpeed)
    this.sx = Math.random() * this.sy
  }

  setStyle() {
    const { d, opacity, x, y } = this
    this.el.style.cssText = `
      position: fixed;
      left: 0px;
      top: 0px;
      width: ${d}px;
      height: ${d}px;
      opacity: ${opacity};
      background-image: radial-gradient(#fff 0%, rgba(255, 255, 255, 0) 60%);
      border-radius: 50%;
      z-index: 100;
      pointer-events: none;
      transform: translate(${x}px, ${y}px);
    `
  }

  render() {
    const el = document.createElement('div')
    this.el = el
    this.setStyle()
    document.body.appendChild(el)
  }

  move() {
    const { windowWidth, windowHeight, d, sx, sy } = this
    // 更新位置
    this.x += sx
    this.y += sy
    // 抵达边缘
    if (this.x > windowWidth) this.x = -d
    if (this.y > windowHeight) {
      this.x = randInt(-d, windowWidth - d)
      this.y = -d
    }
    const { x, y } = this
    this.el.style.transform = `translate(${x}px, ${y}px)`
  }
}

const snowsList = []

function render() {
  for (let i = 0; i < 300; i++) {
    const snow = new Snow()
    snow.render()
    snowsList.push(snow)
  }
}

function move(span) {
  let recent = performance.now()
  const move = (time) => {
    if (time - recent > span) {
      recent = time
      snowsList.forEach((snow) => snow.move())
    }
    requestAnimationFrame(move)
  }
  requestAnimationFrame(move)
}

render()
move(30)
