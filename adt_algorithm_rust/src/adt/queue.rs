use std::fmt::Debug;
use crate::adt::heap::{Heap, MaxHeap};

#[derive(Debug)]
pub struct Queue<T> {
    list: Vec<T>,
}

impl<T> Queue<T> {
    pub fn new() -> Self {
        Queue { list: Vec::new() }
    }
}

impl<T> Queue<T> where T: Debug {
    pub fn enqueue(&mut self, val: T) {
        self.list.push(val);
    }

    pub fn dequeue(&mut self) -> Option<T> {
        if self.list.len() > 0 {
            Some(self.list.remove(0))
        } else {
            None
        }
    }

    pub fn len(&self) -> usize { self.list.len() }

    pub fn is_empty(&self) -> bool { self.list.is_empty() }

    pub fn peek(&self) -> Option<&T> { self.list.first() }
}

mod tests {
    use crate::adt::queue::Queue;

    #[test]
    fn test_queue() {
        let mut queue = Queue::new();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        println!("queue: {:?}", queue);

        assert_eq!(1, queue.dequeue().unwrap());
        assert_eq!(2, queue.dequeue().unwrap());

        queue.enqueue(4);
        queue.enqueue(5);

        println!("queue: {:?}", queue);

        assert_eq!(3, queue.dequeue().unwrap());
        assert_eq!(4, queue.dequeue().unwrap());
        assert_eq!(5, queue.dequeue().unwrap());
        assert_eq!(None, queue.dequeue());
    }
}

struct PriorityQueue<T> {
    _heap: Box<dyn Heap<T>>,
}

impl<T: 'static + PartialOrd + Clone> PriorityQueue<T> {
    fn new() -> Self {
        PriorityQueue { _heap: Box::new(MaxHeap::new()) }
    }

    fn from(list: Vec<T>) -> Self {
        PriorityQueue { _heap: Box::new(MaxHeap::from(list)) }
    }
}

impl<T: PartialOrd> PriorityQueue<T> {
    pub fn next(&mut self) -> Option<T> {
        self._heap.top()
    }
}

mod pq_tests {
    use crate::adt::queue::PriorityQueue;

    #[test]
    fn test_create() {
        let _pq: PriorityQueue<i32> = PriorityQueue::new();
        let mut pq = PriorityQueue::from(vec![1, 2, 3, 4, 5, 6, 7]);
        // println!("{:?}", pq._heap);
        assert_eq!(7, pq.next().unwrap());
        assert_eq!(6, pq.next().unwrap());
        assert_eq!(5, pq.next().unwrap());
        assert_eq!(4, pq.next().unwrap());
        assert_eq!(3, pq.next().unwrap());
        assert_eq!(2, pq.next().unwrap());
        assert_eq!(1, pq.next().unwrap());
        assert_eq!(None, pq.next());
    }
}