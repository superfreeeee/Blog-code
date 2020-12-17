function getStyleVal (el, attr) {
  const s = getComputedStyle(el)[attr]
  return Number(s.substring(0, s.indexOf('p')))
}

function maxOffset (el) {
  const p = el.parentNode
  const outerW = getStyleVal(p, 'width')
  const outerH = getStyleVal(p, 'height')
  const innerW = getStyleVal(el, 'width')
  const innerH = getStyleVal(el, 'height')
  return [outerW - innerW, outerH - innerH]
}

const data = {
  zIndex: 0
}

function dragStart (e, id) {
  const el = document.getElementById(id)
  const [top, left] = [getStyleVal(el, 'top'), getStyleVal(el, 'left')]
  const [maxW, maxH] = maxOffset(el)
  const [cursorX, cursorY] = [e.clientX, e.clientY]

  el.style.zIndex = ++data.zIndex
  
  const getMove = function (e) {
    const [x, y] = [e.clientX, e.clientY]
    const [offsetX, offsetY] = [x - cursorX, y - cursorY]
    let [nextTop, nextLeft] = [top + offsetY, left + offsetX]
    nextLeft = nextLeft < 0 ? 0 : nextLeft > maxW ? maxW : nextLeft
    nextTop = nextTop < 0 ? 0 : nextTop > maxH ? maxH : nextTop
    el.style.left = `${nextLeft}px`
    el.style.top = `${nextTop}px`
  }
  this.addEventListener('mousemove', getMove)
  this.onmouseup = function (e) {
    this.removeEventListener('mousemove', getMove)
  }
}