import { log } from '../../utils/console'
import { foo, RealSubject, Subject } from './subjects'

/***** Remote Proxy *****/
const urlMapper = new Map<string, Subject>()
urlMapper.set('url1', new RealSubject('url1'))
urlMapper.set('url2', new RealSubject('url2'))
urlMapper.set('url3', new RealSubject('url3'))

export let config = {
  url: 'url1',
}

export const remoteProxy: Subject = new Proxy(foo, {
  get(target, key, receiver) {
    return Reflect.get(
      urlMapper.get(config.url) || target,
      key,
      receiver
    )
  },
})

/***** Virtual Proxy *****/
export const virtualProxy: Subject = new Proxy(new RealSubject(), {
  get(target, key, receiver) {
    const value = Reflect.get(target, key, receiver)
    if (!value && key !== 'base') {
      log(`set property: ${key as string}`)
      Reflect.set(target, key, key, receiver)
      return key
    }
    return value
  },
})

/***** Protection Proxy *****/
const subject: Subject = new RealSubject()
subject.name1 = 'protected name 1'
subject.name2 = 'protected name 2'
subject.name3 = 'protected name 3'

export const protectionProxy: Subject = new Proxy(subject, {
  get(target, key, receiver) {
    if (['name1', 'name2', 'name3'].includes(key as string)) {
      return Reflect.get(target, key, receiver)
    }
    throw new Error(`invalid access key '${key as string}'`)
  },
})
