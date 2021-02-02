package com.example.algorithm.adt.bst;

/**
 * 二叉搜索樹實現
 * @param <T>
 */
public class BinarySearchTreeImpl<T> implements BinarySearchTree<T> {

    /**
     * 內部節點類
     * @param <T>
     */
    protected static class BSTNode<T> {
        /**
         * 關鍵字
         */
        int key;

        /**
         * 衛星數據
         */
        T data;

        /**
         * p 指向父節點
         * left 指向左子樹
         * right 指向右子樹
         */
        BSTNode<T> p, left, right;

        BSTNode(int key, T data) {
            this(key, data, null, null, null);
        }

        BSTNode(int key, T data, BSTNode<T> p, BSTNode<T> left, BSTNode<T> right) {
            this.key = key;
            this.data = data;
            this.p = p;
            this.left = left;
            this.right = right;
        }
    }

    /**
     * 哨兵節點
     */
    protected BSTNode<T> nil;

    /**
     * 根節點
     */
    protected BSTNode<T> root;

    {
        nil  = new BSTNode<T>(0, null);
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

    private void inorder(BSTNode<T> node, StringBuilder res) {
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

    private void preorder(BSTNode<T> node, StringBuilder res) {
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

    private void postorder(BSTNode<T> node, StringBuilder res) {
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

    private BSTNode<T> searchNode(int key) {
        BSTNode<T> cur = root;
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

    private BSTNode<T> max(BSTNode<T> cur) {
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

    private BSTNode<T> min(BSTNode<T> cur) {
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
        BSTNode<T> x = searchNode(key);
        if(x.right != nil) {
            return min(x.right).data;
        }
        BSTNode<T> y = x.p;
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
        BSTNode<T> x = searchNode(key);
        if(x.left != nil) {
            return max(x.left).data;
        }
        BSTNode<T> y = x.p;
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
        BSTNode<T> z = new BSTNode<T>(key, data, nil, nil, nil);
        if (root == nil) {
            root = z;
            return;
        }
        BSTNode<T> x = root, y = nil;
        while (x != nil) {
            y = x;
            if(key < x.key) {
                x = y.left;
            } else {
                x = y.right;
            }
        }
        z.p = y;
        if (key < y.key) {
            y.left = z;
        } else {
            y.right = z;
        }
    }

    /**
     * 刪除元素
     *
     * @param key
     * @return
     */
    public T delete(int key) {
        BSTNode<T> z = searchNode(key);
        if (z.left == nil) {
            transplant(z, z.right);
        } else if (z.right == nil) {
            transplant(z, z.left);
        } else {
            BSTNode<T> y = min(z.right);
            if(y.p != z) {
                transplant(y, y.right);
                y.right = z.right;
                y.right.p = y;
            }
            transplant(z, y);
            y.left = z.left;
            y.left.p = y;
        }
        return z.data;
    }

    /**
     * 取代節點，以 v 取代 u（使 v 和 u.p 互連）
     * @param u
     * @param v
     */
    private void transplant(BSTNode<T> u, BSTNode<T> v) {
        if (u.p == nil) {
            root = v;
        } else if (u == u.p.left) {
            u.p.left = v;
        } else {
            u.p.right = v;
        }
        if (v != nil) {
            v.p = u.p;
        }
    }

    public void print() {
        StringBuilder res = new StringBuilder();
        print(root, res);
        System.out.println(res.toString());
    }

    private void print(BSTNode<T> node, StringBuilder res) {
        if(node == nil) {
            res.append(" ");
        } else {
            res.append(node.key);
            res.append(": {");
            print(node.left, res);
            res.append(", ");
            print(node.right, res);
            res.append("}");
        }
    }
}
