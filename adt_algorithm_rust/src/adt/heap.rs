use std::fmt::Debug;

#[derive(Debug)]
pub struct MaxHeap<T> {
    list: Vec<T>,
}

pub trait Heap<T: PartialOrd> {
    fn heapify(&mut self, limit: usize, i: usize);
    fn top(&mut self) -> Option<T>;
}

#[inline]
fn left_child(i: usize) -> usize { i * 2 + 1 }

impl<T: PartialOrd> MaxHeap<T> {
    fn swap(&mut self, i: usize, j: usize) {
        let v2 = self.list.remove(j);
        let v1 = self.list.remove(i);
        self.list.insert(i, v2);
        self.list.insert(j, v1);
    }
}

impl<T: PartialOrd> Heap<T> for MaxHeap<T> where T: PartialOrd {
    fn heapify(&mut self, limit: usize, mut i: usize) {
        loop {
            let l = left_child(i);

            if l >= limit {
                break;
            }

            let cur = self.list.get(i).unwrap();
            let left = self.list.get(l);
            let right = if l >= limit - 1 { None } else { self.list.get(l + 1) };

            match (left, right) {
                (Some(v1), Some(v2)) => {
                    if v1 > cur || v2 > cur {
                        if v1 > v2 {
                            self.swap(i, l);
                            i = l;
                        } else {
                            self.swap(i, l + 1);
                            i = l + 1;
                        }
                    } else {
                        break;
                    }
                }
                (Some(v), None) => {
                    if v > cur {
                        self.swap(i, l);
                        i = l;
                    } else {
                        break;
                    }
                }
                _ => {
                    // both None
                    break;
                }
            }
        }
    }

    fn top(&mut self) -> Option<T> {
        let len = self.list.len();
        if len > 0 {
            if len > 1 {
                self.swap(0, len - 1);
            }

            let res = self.list.pop();
            self.heapify(len - 1, 0);
            res
        } else {
            None
        }
    }
}

impl<T: PartialOrd> MaxHeap<T> {
    pub fn new() -> Self {
        MaxHeap { list: Vec::new() }
    }

    pub fn from(list: Vec<T>) -> Self {
        let mut heap = MaxHeap::new();
        heap.list = list;

        let limit = heap.list.len();
        let mut i = limit;

        while i > 0 {
            i -= 1;
            heap.heapify(limit, i);
        }
        heap
    }
}

pub fn heap_sort<T: PartialOrd + Clone>(list: Vec<T>) -> Vec<T> {
    let mut heap = MaxHeap::from(list);

    let mut i = heap.list.len() - 1;
    while i > 0 {
        heap.swap(0, i);
        heap.heapify(i, 0);
        i -= 1;
    }
    heap.list
}

mod tests {
    use crate::adt::heap::{Heap, heap_sort, MaxHeap};

    #[test]
    fn test_heap_from() {
        let heap = MaxHeap::from(vec![1, 2, 3, 4, 5, 6, 7]);
        println!("{:?}", heap);

        assert_eq!(vec![7, 5, 6, 4, 2, 1, 3], heap.list);
    }

    #[test]
    fn test_heap_sort() {
        let list = vec![1, 3, 5, 7, 9, 2, 4, 6, 8];
        println!("list: {:?}", list);
        let sorted = heap_sort(list);
        println!("sorted: {:?}", sorted)
    }

    #[test]
    fn test_top() {
        let mut heap = MaxHeap::from(vec![1, 2, 3, 4, 5, 6, 7]);
        assert_eq!(vec![7, 5, 6, 4, 2, 1, 3], heap.list);

        let res = heap.top().unwrap();
        assert_eq!(7, res);
        assert_eq!(vec![6, 5, 3, 4, 2, 1], heap.list);
    }
}
