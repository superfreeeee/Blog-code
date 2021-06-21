import { group, log } from '../../../utils/console'
import Adapter from './Adapter'
import Target from '../Target'
import Adaptee from '../Adaptee'

group('object adapter', () => {
  const adapter: Target = new Adapter(new Adaptee())

  const res = adapter.request('123')
  log(`res = ${res}`)
})
