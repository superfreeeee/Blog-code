#[derive(Debug)]
struct StackNode<T> {
    val: T,
    next: Option<Box<StackNode<T>>>,
}

impl<T> StackNode<T> {
    fn from(val: T) -> Self {
        StackNode { val, next: None }
    }
}

#[derive(Debug)]
pub struct Stack<T> {
    top: Option<Box<StackNode<T>>>,
    len: usize,
}

// create
impl<T> Stack<T> {
    #[inline]
    pub fn new() -> Self {
        Stack { top: None, len: 0 }
    }

    pub fn from(mut arr: Vec<T>) -> Self {
        let mut stack = Stack::new();
        while let Some(val) = arr.pop() {
            stack.push(val);
        }
        stack
    }
}

// operation
impl<T> Stack<T> {
    pub fn push(&mut self, val: T) {
        let mut node = StackNode::from(val);
        node.next = self.top.take();

        self.top = Some(Box::new(node));
        self.len += 1;
    }

    /// pop operation
    pub fn pop(&mut self) -> Option<T> {
        match self.top.take() {
            Some(mut target) => {
                self.top = target.next.take();
                self.len -= 1;
                Some(target.val)
            }
            None => None
        }
    }

    #[inline]
    pub fn len(&self) -> usize { self.len }
}

mod tests {
    use crate::adt::stack::Stack;

    #[test]
    fn stack_test() {
        let mut stack = Stack::new();
        stack.push(1u8);
        stack.push(2u8);
        stack.push(3u8);

        println!("stack: {:?}", stack);

        assert_eq!(3, stack.len());
        assert_eq!(3u8, stack.pop().unwrap());

        assert_eq!(2, stack.len());
        assert_eq!(2u8, stack.pop().unwrap());
        assert_eq!(1, stack.len());

        stack.push(4);

        println!("stack: {:?}", stack);

        assert_eq!(2, stack.len());
        assert_eq!(4u8, stack.pop().unwrap());
        assert_eq!(1u8, stack.pop().unwrap());
        assert_eq!(0, stack.len());
        assert_eq!(None, stack.pop());
    }

    #[test]
    fn stack_from() {
        let mut stack = Stack::from(vec![1, 2, 3, 4, 5]);
        assert_eq!(1, stack.pop().unwrap());
        assert_eq!(2, stack.pop().unwrap());
        assert_eq!(3, stack.pop().unwrap());
        assert_eq!(4, stack.pop().unwrap());
        assert_eq!(5, stack.pop().unwrap());
        assert_eq!(None, stack.pop());
    }
}