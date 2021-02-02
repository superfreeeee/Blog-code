package com.example.algorithm.adt.bst;

/**
 * AVL 樹（高度平衡樹）
 * @param <T>
 */
public class AVLTree<T> implements BinarySearchTree<T> {

    /**
     * 內部節點類
     * @param <T>
     */
    private static final class AVLNode<T> {
        /**
         * 關鍵字
         */
        int key;

        /**
         * 衛星數據
         */
        T data;

        /**
         * 節點高度
         */
        int h;

        /**
         * p 指向父節點
         * left 指向左子樹
         * right 指向右子樹
         */
        AVLNode<T> p, left, right;

        AVLNode(int key, T data) {
            this.key = key;
            this.data = data;
        }

        AVLNode(int key, T data, AVLNode<T> p, AVLNode<T> left, AVLNode<T> right) {
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
    private AVLNode<T> nil;

    /**
     * 根節點
     */
    private AVLNode<T> root;

    {
        nil = new AVLNode<T>(0, null);
        nil.h = -1;
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

    private void inorder(AVLNode<T> node, StringBuilder res) {
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

    private void preorder(AVLNode<T> node, StringBuilder res) {
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

    private void postorder(AVLNode<T> node, StringBuilder res) {
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

    private AVLNode<T> searchNode(int key) {
        AVLNode<T> cur = root;
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

    private AVLNode<T> max(AVLNode<T> cur) {
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

    private AVLNode<T> min(AVLNode<T> cur) {
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
        AVLNode<T> x = searchNode(key);
        if(x.right != nil) {
            return min(x.right).data;
        }
        AVLNode<T> y = x.p;
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
        AVLNode<T> x = searchNode(key);
        if(x.left != nil) {
            return max(x.left).data;
        }
        AVLNode<T> y = x.p;
        while(y != nil && x == y.left) {
            x = y;
            y = x.p;
        }
        return y.data;
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

    /**
     * 插入元素
     *
     * @param key
     * @param data
     */
    public void insert(int key, T data) {
        AVLNode<T> z = new AVLNode<T>(key, data, nil, nil, nil);
        if (root == nil) {
            root = z;
            z.p = nil;
            return;
        }
        AVLNode<T> x = root, y = nil, t = nil;
        // 尋找插入位置
        while(x != nil) {
            y = x;
            if (key < x.key) {
                x = y.left;
            } else {
                x = y.right;
            }
            if (x == y.left && x.h > y.right.h ||
                x == y.right && x.h > y.left.h) {
                t = y;
            }
        }
        z.p = y;
        if(key < y.key) {
            y.left = z;
        } else {
            y.right = z;
        }
        // 按插入路徑遞增高度
        if(y.left == nil || y.right == nil) {
//            System.out.println(y.key + ".key increment");
            while(y != nil) {
                y.h++;
                y = y.p;
            }
        }
        // 插入後平衡
        if(Math.abs(t.left.h - t.right.h) > 1) {
            balance(t);
        }
    }

    /**
     * 平衡
     * @param t
     */
    private void balance(AVLNode<T> t) {
        if(t.left.h > t.right.h) {
            if(t.left.right.h > t.left.left.h) {
                leftRotate(t.left);
            }
            rightRotate(t);
        } else {
            if(t.right.left.h > t.right.right.h) {
                rightRotate(t.right);
            }
            leftRotate(t);
        }
    }

    /**
     * 更新樹的高度
     * 時間複雜度：O(1)
     * @param x
     */
    private void updateHeight(AVLNode<T> x) {
        x.h = Math.max(x.left.h, x.right.h) + 1;
    }

    /**
     * 左旋轉
     * @param x
     */
    private void leftRotate(AVLNode<T> x) {
        AVLNode<T> y = x.right;
        y.p = x.p;
        if (x.p == nil) {
            root = y;
        } else if (x == x.p.left) {
            x.p.left = y;
        } else {
            x.p.right = y;
        }
        x.right = y.left;
        if(y.left != nil) {
            y.left.p = x;
        }
        x.p = y;
        y.left = x;
        // 更新高度
        while(x != nil) {
            updateHeight(x);
            x = x.p;
        }
    }

    /**
     * 右旋轉
     * @param y
     */
    private void rightRotate(AVLNode<T> y) {
        AVLNode<T> x = y.left;
        x.p = y.p;
        if (y.p == nil) {
            root = x;
        } else if (y == y.p.left) {
            y.p.left = x;
        } else {
            y.p.right = x;
        }
        y.left = x.right;
        if (x.right != nil) {
            x.right.p = y;
        }
        y.p = x;
        x.right = y;
        // 更新高度
        while(y != nil) {
            updateHeight(y);
            y = y.p;
        }
    }

    public void print() {
        StringBuilder res = new StringBuilder();
        print(root, res);
        System.out.println(res.toString());
    }

    private void print(AVLNode<T> node, StringBuilder res) {
        if(node == nil) {
            res.append(" ");
        } else {
            res.append(node.key + "("+ node.h +")");
            res.append(": {");
            print(node.left, res);
            res.append(", ");
            print(node.right, res);
            res.append("}");
        }
    }


}
