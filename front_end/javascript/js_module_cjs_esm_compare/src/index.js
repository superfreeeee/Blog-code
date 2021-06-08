import { group } from './utils'

group('reference', () => {
  require('./reference')
})

group('cycle_dependency', () => {
  require('./cycle_dependency')
})
