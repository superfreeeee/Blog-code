import { group, log } from '../../../utils/console'
import Adapter from './Adapter'
import Target from '../Target'

group('class adapter', () => {
  const adapter: Target = new Adapter()

  const res = adapter.request('123')
  log(`res = ${res}`)
})
