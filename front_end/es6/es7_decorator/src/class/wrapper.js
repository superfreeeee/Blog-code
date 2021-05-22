import { log } from '../utils'

function bindColor(color) {
  return (target) => {
    target._color = color
  }
}

@bindColor('red')
class Red {}

@bindColor('green')
class Green {}

@bindColor('Blue')
class Blue {}

log('Red:   ', Red)
log('Green: ', Green)
log('Blue:  ', Blue)
