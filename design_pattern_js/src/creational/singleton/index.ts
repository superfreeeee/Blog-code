import { group, log } from '../../utils/console'
import {
  instanceWithModule,
  instanceWithProxy,
  ProductWithStaticInstance,
} from './products'

group('ProductWithStaticInstance', () => {
  log('access 1:', ProductWithStaticInstance.getInstance())
  log('access 2:', ProductWithStaticInstance.getInstance())
  log('access 3:', ProductWithStaticInstance.getInstance())
})

group('ProductWithProxy', () => {
  log('access 1:', instanceWithProxy.instance)
  log('access 2:', instanceWithProxy.instance)
  log('access 3:', instanceWithProxy.instance)
})

group('ProductWithModule', () => {
  log('access 1:', instanceWithModule)
  log('access 2:', instanceWithModule)
  log('access 3:', instanceWithModule)
})
