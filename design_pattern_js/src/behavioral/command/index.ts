import {
  Command,
  CommandUsingContext,
  SimpleCommand,
} from './commands'
import { Application } from './receivers'

class Invoker {
  receiver: Application
  commands: Command[] = []

  constructor(receiver: Application) {
    this.receiver = receiver
  }

  simple() {
    const command = new SimpleCommand(this.receiver, 'commandRealize')
    this.commands.push(command)
    command.execute()
  }

  usingContext() {
    const command = new CommandUsingContext(this.receiver)
    this.commands.push(command)
    command.execute()
  }
}

const app = new Application()
const invoker = new Invoker(app)

invoker.simple()
invoker.usingContext()
