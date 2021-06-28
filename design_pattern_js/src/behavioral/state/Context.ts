import { log } from '../../utils/console'
import { Connected, Disconnected, State } from './states'

export default class Context {
  state: State = new Disconnected()

  connect() {
    this.state = new Connected()
    log('Context is Connected')
  }

  request() {
    log('invoke Context.requrest')
    this.state.handle()
  }
}
