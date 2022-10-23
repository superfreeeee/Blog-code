pub struct Solution {}

// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

use std::fmt::Debug;
impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }

    pub fn from(mut vec: Vec<i32>) -> Option<Box<ListNode>> {
        let mut head = None;
        while vec.len() > 0 {
            head = Some(Box::new(ListNode {
                val: vec.pop().unwrap(),
                next: head,
            }))
        }

        head
    }
}

impl Debug for ListNode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!("[{}, {:?}]", self.val, self.next))
    }
}

impl Solution {
    pub fn remove_nth_from_end(mut head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
        if Self::remove_node(&mut head, n) == n {
            return head.unwrap().next;
        }
        head
    }

    fn remove_node(head: &mut Option<Box<ListNode>>, n: i32) -> i32 {
        if head.is_none() {
            return 0;
        }

        let p = &mut head.as_mut().unwrap().next;
        let m = Self::remove_node(p, n);

        if n == m {
            head.as_mut().unwrap().next = p.take().unwrap().next;
        }

        m + 1
    }
}
