/**
 * mousedown 事件实现拖曳效果
 */

// 鼠标按下
const defaultStart = () => {
  console.log('drag start')
}

// 鼠标移动
const defaultMove = () => {
  console.log('drag move')
}

// 鼠标放开
const defaultUp = () => {
  console.log('drag up')
}

/**
 * 拖曳事件函数
 * note: 自动注册移动监听函数 & 放开后解除绑定
 * @param {*} e drag start event
 * @param {*} param1 event handlers
 */
export const drag = (
  e,
  { start = defaultStart, move = defaultMove, up = defaultUp } = {}
) => {
  e.preventDefault()
  const wrappedUp = (e) => {
    up(e)
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', wrappedUp)
  }
  start(e)
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', wrappedUp)
}
