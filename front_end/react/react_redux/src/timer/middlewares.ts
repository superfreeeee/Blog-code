import { Middleware } from 'redux'

export const middlewareSample: Middleware =
  (store) => (next) => (action) => {
    console.group('[middlewareSample] log')
    console.log(`before action: count=${store.getState()}`)
    next(action)
    console.log(`after action: count=${store.getState()}`)
    console.groupEnd()
  }
