import { log } from '../../utils/console'
import Aggregate from './Aggregate'
import Iterator from './Iterator'

export default class LinkedList<Data> implements Aggregate<Data> {
  head: Node<Data> | null = null
  tail: Node<Data> | null = null

  add(data: Data) {
    if (!this.head) {
      this.tail = this.head = new Node(data)
    } else {
      this.tail!.next = new Node(data)
      this.tail = this.tail!.next
    }
  }

  iterator() {
    return new LinkedListIterator(this.head)
  }
}

class Node<Data> {
  data: Data
  next: Node<Data> | null

  constructor(data: Data) {
    this.data = data
    this.next = null
  }
}

class LinkedListIterator<Data> implements Iterator<Data> {
  head: Node<Data> | null
  currentNode: Node<Data> | null

  constructor(head: Node<Data> | null) {
    this.head = head
    this.currentNode = head
  }

  first() {
    return this.head ? this.head.data : null
  }

  current() {
    return this.currentNode ? this.currentNode.data : null
  }

  next() {
    if (!this.isDone()) {
      this.currentNode = this.currentNode!.next
    }
    return this.current()
  }

  isDone() {
    return !this.currentNode
  }
}
