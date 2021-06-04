import { log } from './utils'
import _ from 'lodash'

log(`load module a with lodash ${_.VERSION}`)

export function a() {
  log('invoke function a from src/modules/a.js')
}
