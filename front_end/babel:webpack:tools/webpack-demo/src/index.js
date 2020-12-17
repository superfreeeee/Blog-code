import './index.css'
import { aHi } from './a'

function component() {
  const div = document.createElement('div')

  div.innerHTML = ['Hello', 'Webpack'].join(' ')

  return div
}

aHi()

const root = document.getElementById('root')
root.appendChild(component())