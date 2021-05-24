import { group } from './modules/utils'
import { a } from './modules/a'
import { b } from './modules/b'

group('entryA', () => {
  a()
  b()
})
