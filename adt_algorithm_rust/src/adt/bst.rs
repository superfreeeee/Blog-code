use std::fmt::Debug;

type SubTreeNode<K, V> = Option<Box<TreeNode<K, V>>>;
type Pair<K, V> = (K, V);

#[derive(Debug)]
struct TreeNode<K, V> {
    key: K,
    val: V,
    left: SubTreeNode<K, V>,
    right: SubTreeNode<K, V>,
}

impl<K, V> TreeNode<K, V> {
    fn new(key: K, val: V) -> Self {
        TreeNode {
            key,
            val,
            left: None,
            right: None,
        }
    }

    fn entry(&self) -> Pair<&K, &V> {
        (&self.key, &self.val)
    }
}

/// 二叉树实现
trait BinaryTree<K, V> {
    /// 二叉树遍历
    fn pre_order(&self);
    fn in_order(&self);
    fn post_order(&self);
}

impl<K, V> BinaryTree<K, V> for TreeNode<K, V> where K: Debug, V: Debug {
    fn pre_order(&self) {
        println!("{:?}", self.entry());

        if let Some(left) = &self.left {
            left.pre_order();
        }
        if let Some(right) = &self.right {
            right.pre_order();
        }
    }

    fn in_order(&self) {
        if let Some(left) = &self.left {
            left.in_order();
        }
        println!("{:?}", self.entry());
        if let Some(right) = &self.right {
            right.in_order();
        }
    }

    fn post_order(&self) {
        if let Some(left) = &self.left {
            left.post_order();
        }
        if let Some(right) = &self.right {
            right.post_order();
        }
        println!("{:?}", self.entry());
    }
}

trait BinarySearchTree<K, V> {
    fn insert(&mut self, key: K, val: V);
}

impl<K: PartialOrd, V> BinarySearchTree<K, V> for TreeNode<K, V> {
    fn insert(&mut self, key: K, val: V) {
        if self.key > key {
            if let Some(ref mut left) = self.left {
                left.insert(key, val);
            } else {
                self.left = Some(Box::new(TreeNode::new(key, val)));
            }
        } else {
            if let Some(ref mut right) = self.right {
                right.insert(key, val);
            } else {
                self.right = Some(Box::new(TreeNode::new(key, val)));
            }
        }
    }
}

mod tests {
    use crate::adt::bst::{BinarySearchTree, BinaryTree, TreeNode};

    #[test]
    fn test_binary_tree_traversal() {
        let left = TreeNode::new(1, 10);
        let right = TreeNode::new(3, 30);
        let mut root = TreeNode::new(2, 20);
        root.left = Some(Box::new(left));
        root.right = Some(Box::new(right));

        println!("root: {:?}", root);

        println!(">>> pre order");
        root.pre_order();
        println!(">>> in order");
        root.in_order();
        println!(">>> post order");
        root.post_order();
    }

    #[test]
    fn test_insert() {
        let mut root = TreeNode::new(3, 30);
        root.insert(1, 10);
        root.insert(2, 20);
        root.insert(4, 40);
        root.insert(5, 50);
        println!("{:?}", root);
        root.in_order();
    }
}
