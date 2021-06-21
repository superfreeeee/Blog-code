import { group, log } from '../../utils/console'
import {
  config,
  protectionProxy,
  remoteProxy,
  virtualProxy,
} from './proxys'

group('remote proxy', () => {
  config.url = 'url1'
  remoteProxy.request()
  config.url = 'url2'
  remoteProxy.request()
  config.url = 'url3'
  remoteProxy.request()
})

group('virtual proxy(cache)', () => {
  log(`virtualProxy.name1 = ${virtualProxy.name1}`)
  log(`virtualProxy.name2 = ${virtualProxy.name2}`)
  log(`virtualProxy.name3 = ${virtualProxy.name3}`)
  log(`virtualProxy.name2 = ${virtualProxy.name2}`)
  log(`virtualProxy.name1 = ${virtualProxy.name1}`)
  virtualProxy.request()
})

group('protection proxy(access protection)', () => {
  ;['name1', 'name2', 'name3', 'base'].forEach((key) => {
    try {
      log(
        `protectionProxy.${key} = ${Reflect.get(
          protectionProxy,
          key,
          protectionProxy
        )}`
      )
    } catch (e) {
      log(`exception caught: ${e}`)
    }
  })
})
