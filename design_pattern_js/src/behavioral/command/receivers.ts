import { log } from '../../utils/console'

export class Context {
  commandRealize() {
    log('invoke Context.commandRealize')
  }
}

export interface ApplicationReceiver {
  commandRealize(): void
}

export class Application implements ApplicationReceiver {
  context?: Context

  commandRealize() {
    log('invoke Application.commandRealize')
  }
}
