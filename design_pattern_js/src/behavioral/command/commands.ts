import { log } from '../../utils/console'
import {
  Application,
  ApplicationReceiver,
  Context,
} from './receivers'

export interface Command {
  execute(): void
}

export class SimpleCommand implements Command {
  receiver: Application
  func: keyof ApplicationReceiver

  constructor(
    receiver: Application,
    func: keyof ApplicationReceiver
  ) {
    this.receiver = receiver
    this.func = func
  }

  execute() {
    log('SimpleCommand.execute')
    this.receiver[this.func]()
  }
}

export class CommandUsingContext implements Command {
  receiver: Application

  constructor(receiver: Application) {
    this.receiver = receiver
    this.receiver.context = new Context()
  }

  execute() {
    log('CommandUsingContext.execute')
    this.receiver.context?.commandRealize()
  }
}
