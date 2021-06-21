import Adaptee from '../Adaptee'
import Target from '../Target'

export default class Adapter extends Adaptee implements Target {
  request(s: string) {
    const num = this.originRequest(Number(s))
    return num.toString()
  }
}
