import Aggregate from './Aggregate'
import Iterator from './Iterator'

export default class ArrayList<Data> implements Aggregate<Data> {
  dataList: Data[] = []

  add(data: Data) {
    this.dataList.push(data)
  }

  iterator() {
    return new ArrayListIterator<Data>(this.dataList)
  }
}

export class ArrayListIterator<Data> implements Iterator<Data> {
  dataList: Data[]
  currentIdx: number

  constructor(dataList: Data[]) {
    this.dataList = dataList
    this.currentIdx = 0
  }

  first() {
    return this.dataList.length ? this.dataList[0] : null
  }

  current() {
    return this.isDone() ? null : this.dataList[this.currentIdx]
  }

  next() {
    if (!this.isDone()) {
      this.currentIdx++
      return this.dataList[this.currentIdx]
    }
    return null
  }

  isDone() {
    return this.currentIdx >= this.dataList.length
  }
}
