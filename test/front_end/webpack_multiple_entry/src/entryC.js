import { group } from './modules/utils'
import { a } from './modules/a'
import { c } from './modules/c'

group('entryC', () => {
  a()
  c()
})
