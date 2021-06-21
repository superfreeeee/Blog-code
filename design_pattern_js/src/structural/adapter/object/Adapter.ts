import Adaptee from '../Adaptee'
import Target from '../Target'

export default class Adapter implements Target {
  adaptee: Adaptee

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee
  }

  request(s: string) {
    const num = this.adaptee.originRequest(Number(s))
    return num.toString()
  }
}
