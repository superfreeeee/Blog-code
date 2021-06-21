import { group } from '../utils/console'

group('Adapter', () => {
  require('./adapter')
})

group('Bridge', () => {
  require('./bridge')
})

group('Composite', () => {
  require('./composite')
})

group('Decorator', () => {
  require('./decorator')
})

group('Facade', () => {
  require('./facade')
})

group('Flyweight', () => {
  require('./flyweight')
})

group('Proxy', () => {
  require('./proxy')
})
