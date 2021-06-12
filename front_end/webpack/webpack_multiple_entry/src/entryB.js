import { group } from './modules/utils'
import { b } from './modules/b'
import { c } from './modules/c'

group('entryB', () => {
  b()
  c()
})
