import './basic'
console.log('----- interface -----')

// basic interface
interface Person {
  readonly id: number // 只读属性
  name: string
  label?: string // 可选属性
}

const p: Person = { id: 1, name: 'John' }
const p2: Person = { id: 2, name: 'Penny', label: '可选属性' }
// p.id = 2  // error

// Square
interface Square {
  width: number
  height: number
}

function area (s: Square) {
  return s.width * s.height
}

const s: Square = { width: 200, height: 40 }

export default null
