package adt.tree.avl;

public class AVLTreeImpl<T> implements AVLTree<T> {

    private static class Node<T> {
        int key;
        T data;
        Node<T> parent;
        Node<T> left;
        Node<T> right;
    }

    private Node<T> root;

    @Override
    public T search(int key) {
        return null;
    }

    @Override
    public T minimum() {
        return null;
    }

    @Override
    public T maximum() {
        return null;
    }

    @Override
    public T predecessor(int key) {
        return null;
    }

    @Override
    public T successor(int key) {
        return null;
    }

    @Override
    public void insert(int key, T data) {

    }

    @Override
    public T delete(int key) {
        return null;
    }

    @Override
    public int height() {
        return 0;
    }

    @Override
    public boolean empty() {
        return root == null;
    }

    @Override
    public int nodes() {
        return nodes(root);
    }

    private int nodes(Node node) {
        if (node == null) return 0;
        return nodes(node.left) + nodes(node.right) + 1;
    }

    @Override
    public void preorder() {

    }

    @Override
    public void inorder() {

    }

    @Override
    public void postorder() {

    }

    @Override
    public void layerOrder() {

    }

//    private int height(Node<T> node) {
//        if (node == null) return 0;
//        return Math.max(height(node.left), height(node.right)) + 1;
//    }
//
//    /**
//     * 插入元素并指定键
//     *
//     * @param key
//     * @param t
//     */
//    @Override
//    public void insert(int key, T t) {
//        super.insert(key, t);
//        Node<T> p = _search(root, key).parent;
//        while (p != null) {
//            if (Math.abs(height(p.left) - height(p.right)) > 1) {
//                balance(p);
//                return;
//            }
//            p = p.parent;
//        }
//    }
//
//    private void balance(Node<T> p) {
//        if (height(p.left) > height(p.right)) {
//            if (height(p.left.right) > height(p.left.left)) leftRotate(p.left);
//            rightRotate(p);
//        } else {
//            if (height(p.right.left) > height(p.right.right)) rightRotate(p.right);
//            leftRotate(p);
//        }
//    }
//
//    private void leftRotate(Node<T> y) {
//        Node<T> x = y.right;
//        // x - y.parent
//        x.parent = y.parent;
//        if (y.parent == null) root = x;
//        else if (y == y.parent.left) y.parent.left = x;
//        else y.parent.right = x;
//        // y - x.left
//        y.right = x.left;
//        if (y.right != null) y.right.parent = y;
//        // x - y
//        x.left = y;
//        y.parent = x;
//    }
//
//    private void rightRotate(Node<T> y) {
//        Node<T> x = y.left;
//        // x - y.parent
//        x.parent = y.parent;
//        if (y.parent == null) root = x;
//        else if (y == y.parent.left) y.parent.left = x;
//        else y.parent.right = x;
//        // y - x.right
//        y.left = x.right;
//        if (y.left != null) y.left.parent = y;
//        // x - y
//        x.right = y;
//        y.parent = x;
//    }
//
//    /**
//     * 删除元素
//     *
//     * @param key
//     */
//    @Override
//    public void delete(int key) {
//        Node<T> cur = _search(root, key);
//        if (cur == null) return;
//        super.delete(key);
//        if (height(cur.left) > height(cur.right) && cur.right != null) balance(cur.right.parent);
//        cur = cur.parent;
//        while (cur != null) {
//            if (Math.abs(height(cur.left) - height(cur.right)) > 1) {
//                balance(cur);
//                return;
//            }
//            cur = cur.parent;
//        }
//    }
}
