import { log } from '../../utils/console'

export abstract class ProcessTemplate {
  process() {
    this.step1()
    this.step2()
    this.step3()
  }

  step1() {
    log('default step2')
  }

  abstract step2(): void

  step3() {
    log('default step3')
  }
}

export class ProcessA extends ProcessTemplate {
  step2() {
    log('Custom step2 from ProcessA')
  }
}

export class ProcessB extends ProcessTemplate {
  step1() {
    log('Custom step1 from ProcessB')
  }

  step2() {
    log('Custom step2 from ProcessB')
  }
}
