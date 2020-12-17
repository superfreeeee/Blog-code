function getStyleVal (el, attr) {
  const s = getComputedStyle(el)[attr]
  return Number(s.substring(0, s.indexOf('p')))
}

function dragStart (e, id) {
  console.log('mouse down -> drag start')
  const el = document.getElementById(id)
  // console.log(`el.style.top: ${el.style.top}`)
  // console.log(`el.style.top: ${getComputedStyle(el).top}`)
  const [top, left] = [getStyleVal(el, 'top'), getStyleVal(el, 'left')]
  const [cursorX, cursorY] = [e.clientX, e.clientY]

  const getMove = function (e) {
    console.log('mouse move')
    const [x, y] = [e.clientX, e.clientY]
    const [offsetX, offsetY] = [x - cursorX, y - cursorY]
    let [nextLeft, nextTop] = [left + offsetX, top + offsetY]
    el.style.left = `${nextLeft}px`
    el.style.top = `${nextTop}px`
  }
  this.addEventListener('mousemove', getMove)
  this.onmouseup = function (e) {
    console.log('mouse up -> drag over')
    this.removeEventListener('mousemove', getMove)
  }
}