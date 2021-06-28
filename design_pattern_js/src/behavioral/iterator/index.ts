import { group, log } from '../../utils/console'
import Aggregate from './Aggregate'
import ArrayList from './ArrayList'
import Iterator from './Iterator'
import LinkedList from './LinkedList'

function traversal<Data>(iterator: Iterator<Data>) {
  let i = 0
  while (!iterator.isDone()) {
    log(`${i++}:`, iterator.current())
    iterator.next()
  }
}

const arrayList: Aggregate<number> = new ArrayList<number>()
arrayList.add(1)
arrayList.add(3)
arrayList.add(5)
arrayList.add(7)
arrayList.add(9)

const linkedList: Aggregate<number> = new LinkedList<number>()
linkedList.add(2)
linkedList.add(4)
linkedList.add(6)
linkedList.add(8)
linkedList.add(10)

group('traversal arrayList', () => {
  traversal(arrayList.iterator())
})
group('traversal linkedList', () => {
  traversal(linkedList.iterator())
})
