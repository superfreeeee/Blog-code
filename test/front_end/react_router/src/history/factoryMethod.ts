import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  createPath,
} from 'history'

const browserHistory = createBrowserHistory()
const hashHistory = createHashHistory()
const memoryHistory = createMemoryHistory()
// const path = createPath()

console.log(browserHistory)
console.log(hashHistory)
console.log(memoryHistory)
// console.log(path)
