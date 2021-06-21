import { log } from '../../utils/console'

export interface Subject {
  request(): void
  name1?: string
  name2?: string
  name3?: string
}

export const foo = { request() {} }

export class RealSubject implements Subject {
  static count = 0
  id = RealSubject.count++
  base?: string

  constructor(base?: string) {
    if (base) this.base = base
  }

  request() {
    const baseStr = this.base ? ` base: ${this.base} ` : ''
    log(`RealSubject(${this.id}) {${baseStr}}`)
  }
}
