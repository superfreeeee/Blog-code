package adt.tree.avl;

import adt.tree.bst.BinarySearchTreeImpl;

public class AVLTreeImpl<K extends Comparable<K>, T> extends BinarySearchTreeImpl<K, T> implements AVLTree<K, T> {

    @Override
    public void insert(K key, T data) {
        Node<K, T> x = new Node<>(key, data);
        insert(x);
        balance(x);
    }

    @Override
    public T delete(K key) {
        Node<K, T> z = search(root, key);
        if (z == null) return null;
        Node<K, T> x = delete(z);
        balance(x);
        return z.data;
    }

    // 平衡因子
    private int factor = 1;

    /**
     * 计算平衡因子
     *
     * @param x
     * @return
     */
    private int balanceFactor(Node<K, T> x) {
        return height(x.left) - height(x.right);
    }

    /**
     * 插入/删除后平衡
     *
     * @param x
     */
    private void balance(Node<K, T> x) {
        while (x != null) {
            int f;
            if (Math.abs(f = balanceFactor(x)) > factor) {
                // 不平衡
                if (f > 0) {
                    if (balanceFactor(x.left) < 0) {
                        // LR
                        leftRotate(x.left);
                    }
                    // LL
                    rightRotate(x);
                } else {
                    if (balanceFactor(x.right) > 0) {
                        // RL
                        rightRotate(x);
                    }
                    // RR
                    leftRotate(x);
                }
                break;
            }
            x = x.parent;
        }
    }

    /**
     * 左旋转
     *
     * @param x
     */
//   x          y
//  / \        / \
// a   y  ->  x   c
//    / \    / \
//   b   c  a   b
    private void leftRotate(Node<K, T> x) {
        Node<K, T> y = x.right;
        // x & b
        x.right = y.left;
        if (x.right != null) x.right.parent = x;
        // y & x.parent
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        // x & y
        y.left = x;
        x.parent = y;
    }

    /**
     * 右旋转
     *
     * @param y
     */
//   x          y
//  / \        / \
// a   y  <-  x   c
//    / \    / \
//   b   c  a   b
    private void rightRotate(Node<K, T> y) {
        Node<K, T> x = y.left;
        // y & b
        y.left = x.right;
        if (y.left != null) y.left.parent = y;
        // y & x.parent
        x.parent = y.parent;
        if (y.parent == null) root = x;
        else if (y == y.parent.left) y.parent.left = x;
        else y.parent.right = x;
        // x & y
        x.right = y;
        y.parent = x;
    }

}
