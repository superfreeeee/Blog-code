import { log } from '../../utils/console'

export abstract class Handler {
  successor?: Handler

  constructor(successor?: Handler) {
    this.successor = successor
  }

  abstract handleRequest(target: RequestTargetType): void
}

export type RequestTargetType = 'A' | 'B'

export class ConcreteHandlerA extends Handler {
  constructor(successor?: Handler) {
    super(successor)
  }

  handleRequest(target: RequestTargetType) {
    if (target === 'A') {
      log('ConcreteHandlerA handle request')
    } else {
      log('ConcreteHandlerA pass')
      this.successor?.handleRequest(target)
    }
  }
}

export class ConcreteHandlerB extends Handler {
  constructor(successor?: Handler) {
    super(successor)
  }

  handleRequest(target: RequestTargetType) {
    if (target === 'B') {
      log('ConcreteHandlerB handle request')
    } else {
      log('ConcreteHandlerA pass')
      this.successor?.handleRequest(target)
    }
  }
}
