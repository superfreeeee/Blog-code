package com.example.algorithm.adt.bst;


public class RedBlackTree<T> implements BinarySearchTree<T> {

    private static final class RBNode<T> {
        int key;
        T data;
        RedBlackTree.RBColor c;
        RBNode<T> p, left, right;

        public RBNode(int key, T data, RedBlackTree.RBColor c) {
            this.key = key;
            this.data = data;
            this.c = c;
        }

        public RBNode(int key, T data, RedBlackTree.RBColor c, RBNode<T> p, RBNode<T> left, RBNode<T> right) {
            this.key = key;
            this.data = data;
            this.c = c;
            this.p = p;
            this.left = left;
            this.right = right;
        }
    }

    private enum RBColor {
        RED, BLACK;
    }

    private RBNode<T> nil, root;

    {
        nil = new RBNode<T>(0, null, RBColor.BLACK);
        root = nil.p = nil.left = nil.right = nil;
    }

    /**
     * 中序遍歷
     */
    public String inorderWalk() {
        StringBuilder res = new StringBuilder();
        inorder(root, res);
        return res.toString();
    }

    private void inorder(RBNode<T> node, StringBuilder res) {
        if(node != nil) {
            inorder(node.left, res);
            res.append(node.key + " ");
            inorder(node.right, res);
        }
    }

    /**
     * 先序遍歷
     */
    public String preorderWalk() {
        StringBuilder res = new StringBuilder();
        preorder(root, res);
        return res.toString();
    }

    private void preorder(RBNode<T> node, StringBuilder res) {
        if(node != nil) {
            res.append(node.key + " ");
            preorder(node.left, res);
            preorder(node.right, res);
        }
    }

    /**
     * 後序遍歷
     */
    public String postorderWalk() {
        StringBuilder res = new StringBuilder();
        postorder(root, res);
        return res.toString();
    }

    private void postorder(RBNode<T> node, StringBuilder res) {
        if(node != nil) {
            postorder(node.left, res);
            postorder(node.right, res);
            res.append(node.key + " ");
        }
    }

    /**
     * 查找元素
     *
     * @param key
     * @return
     */
    public T search(int key) {
        return searchNode(key).data;
    }

    private RBNode<T> searchNode(int key) {
        RBNode<T> cur = root;
        while(cur != nil && cur.key != key) {
            if(key < cur.key) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return cur;
    }
    /**
     * 最大元素
     *
     * @return
     */
    public T maximum() {
        return max(root).data;
    }

    private RBNode<T> max(RBNode<T> cur) {
        while(cur.right != nil) {
            cur = cur.right;
        }
        return cur;
    }
    /**
     * 最小元素
     *
     * @return
     */
    public T minimum() {
        return min(root).data;
    }

    private RBNode<T> min(RBNode<T> cur) {
        while(cur.left != nil) {
            cur = cur.left;
        }
        return cur;
    }
    /**
     * 後繼元素
     *
     * @param key
     * @return
     */
    public T successor(int key) {
        RBNode<T> x = searchNode(key);
        if(x.right != nil) {
            return min(x.right).data;
        }
        RBNode<T> y = x.p;
        while(y != nil && x == y.right) {
            x = y;
            y = x.p;
        }
        return y.data;
    }
    /**
     * 前驅元素
     *
     * @param key
     * @return
     */
    public T predecessor(int key) {
        RBNode<T> x = searchNode(key);
        if(x.left != nil) {
            return max(x.left).data;
        }
        RBNode<T> y = x.p;
        while(y != nil && x == y.left) {
            x = y;
            y = x.p;
        }
        return y.data;
    }

    /**
     * 插入元素
     *
     * @param key
     * @param data
     */
    public void insert(int key, T data) {

    }

    /**
     * 刪除元素
     *
     * @param key
     * @return
     */
    public T delete(int key) {
        return null;
    }

    public void print() {
        StringBuilder res = new StringBuilder();
        print(root, res);
        System.out.println(res.toString());
    }

    private void print(RBNode<T> node, StringBuilder res) {
        if(node == nil) {
            res.append(" ");
        } else {
            res.append(node.key + "(" + node.c + ")");
            res.append(": {");
            print(node.left, res);
            res.append(", ");
            print(node.right, res);
            res.append("}");
        }
    }
}
