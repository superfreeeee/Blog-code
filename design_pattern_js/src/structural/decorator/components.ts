import { log } from '../../utils/console'

export interface Component {
  operation(): void
}

export class ConcreteComponent implements Component {
  operation() {
    log('invoke operation in ConcreteComponent')
  }
}
