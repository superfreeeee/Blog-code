import { log } from '../../utils/console'

export interface State {
  handle(): void
}

export class Connected implements State {
  handle() {
    log('[Connected] handle success')
  }
}

export class Disconnected implements State {
  handle() {
    log('[Disconnected] handle fail')
  }
}
