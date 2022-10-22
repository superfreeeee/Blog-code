// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode {
            next: None,
            val,
        }
    }
}

pub struct Solution {}

fn carried(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>, mut carry: i32) -> Option<Box<ListNode>> {
    if l1.is_none() && l2.is_none() && carry == 0 {
        None
    } else {
        Some(Box::new(ListNode {
            next: carried(
                l1.and_then(|x| {
                    carry += x.val;
                    x.next
                }),
                l2.and_then(|x| {
                    carry += x.val;
                    x.next
                }),
                carry / 10),
            val: carry % 10,
        }))
    }
}

impl Solution {
    pub fn add_two_numbers(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        carried(l1, l2, 0)
    }
}

fn create_num(nums: Vec<i32>) -> Option<Box<ListNode>> {
    if nums.len() == 0 {
        return None;
    }

    let mut head: Option<Box<ListNode>> = None;
    let mut cur = &mut head;
    for num in nums {
        *cur = Some(Box::new(ListNode::new(num)));
        cur = &mut cur.as_mut().unwrap().next;
    }

    head
}

#[test]
pub fn test() {
    let num1 = create_num(vec![1, 3, 5]);
    let num2 = create_num(vec![2, 4, 6]);

    println!("{:?}", num1);
    println!("{:?}", num2);

    let num3 = Solution::add_two_numbers(num1, num2);
    println!("{:?}", num3);
}