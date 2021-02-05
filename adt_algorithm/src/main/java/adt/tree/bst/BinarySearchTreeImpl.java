package adt.tree.bst;

import java.util.LinkedList;
import java.util.Queue;

public class BinarySearchTreeImpl<T> implements BinarySearchTree<T> {

    protected static class Node<T> {
        public int key;
        public T data;
        public Node<T> parent;
        public Node<T> left;
        public Node<T> right;

        public Node(int key, T data) {
            this.key = key;
            this.data = data;
        }

        @Override
        public String toString() {
            return "{key=" + key +
                    ", data=" + data +
                    ", left=" + left +
                    ", right=" + right +
                    '}';
        }

        String simple() {
            return "{key=" + key + ", data=" + data + "}";
        }

        void tree(String prefix) {
            System.out.println(prefix + simple());
            prefix = prefix + "  ";
            if (left != null) left.tree(prefix);
            else if (right != null) System.out.println(prefix + "null");
            if (right != null) right.tree(prefix);
        }
    }

    protected Node<T> root;

    public static <T> BinarySearchTreeImpl<T> from(int[] keys, T[] values) {
        int n = keys.length;
        BinarySearchTreeImpl<T> bst = new BinarySearchTreeImpl<>();
        bst.build(keys, values, 0, n - 1);
        return bst;
    }

    private void build(int[] keys, T[] values, int l, int r) {
        if (l + 1 == r) { // [l, r]
            insert(keys[l], values[l]);
            insert(keys[r], values[r]);
        } else if (l == r) { // [l]
            insert(keys[l], values[l]);
        } else if (l + 1 < r) { // [l .. m .. r]
            int m = (l + r) / 2;
            insert(keys[m], values[m]);
            build(keys, values, l, m - 1);
            build(keys, values, m + 1, r);
        }
    }

    @Override
    public T search(int key) {
        Node<T> node = search(root, key);
        return node == null ? null : node.data;
    }

    protected Node<T> search(Node<T> node, int key) {
        while (node != null && node.key != key) {
            node = (key < node.key ? node.left : node.right);
        }
        return node;
    }

    @Override
    public T minimum() {
        Node<T> min = minimum(root);
        return min == null ? null : min.data;
    }

    private Node<T> minimum(Node<T> node) {
        if (node == null) return null;
        while (node.left != null) node = node.left;
        return node;
    }

    @Override
    public T maximum() {
        Node<T> max = maximum(root);
        return max == null ? null : max.data;
    }

    private Node<T> maximum(Node<T> node) {
        if (node == null) return null;
        while (node.right != null) node = node.right;
        return node;
    }

    @Override
    public T predecessor(int key) {
        if (root == null) return null; // 树为空
        Node<T> node = searchClosest(root, key);
        if (node.key < key) return node.data;
        Node<T> pre = predecessor(node);
        return pre == null ? null : pre.data;
    }

    private Node<T> predecessor(Node<T> node) {
        if (node.left != null) {
            Node<T> pre = maximum(node.left);
            return pre;
        }
        while (node.parent != null && node == node.parent.left) {
            node = node.parent;
        }
        if (node.parent == null) return null;
        return node.parent;
    }

    private Node<T> searchClosest(Node<T> node, int key) {
        Node<T> pre = null;
        while (node != null && node.key != key) {
            pre = node;
            node = (key < node.key ? node.left : node.right);
        }
        return node == null ? pre : node;
    }

    @Override
    public T successor(int key) {
        if (root == null) return null;
        Node<T> node = searchClosest(root, key);
        if (node.key > key) return node.data;
        Node<T> next = successor(node);
        return next == null ? null : next.data;
    }

    private Node<T> successor(Node<T> node) {
        if (node.right != null) {
            Node<T> next = minimum(node.right);
            return next;
        }
        while (node.parent != null && node == node.parent.right) {
            node = node.parent;
        }
        if (node.parent == null) return null;
        return node.parent;
    }

    @Override
    public void insert(int key, T data) {
        insert(new Node<>(key, data));
    }

    protected void insert(Node<T> x) {
        Node<T> pre = null, cur = root;
        while (cur != null) {
            pre = cur;
            cur = (x.key <= pre.key ? pre.left : pre.right);
        }
        x.parent = pre;
        if (pre == null) {
            root = x;
        } else if (x.key <= pre.key) {
            pre.left = x;
        } else {
            pre.right = x;
        }
    }

    @Override
    public T delete(int key) {
        Node<T> z = search(root, key);
        if (z == null) return null;
        delete(z);
        return z.data;
    }

    protected Node<T> delete(Node<T> z) {
        Node<T> x;
        if (z.left == null) {
            x = z.right;
            transplant(z, z.right);
        } else if (z.right == null) {
            x = z.left;
            transplant(z, z.left);
        } else {
            // target 必有两子
            Node<T> y = x = successor(z); // cur 为 target 后继
            if (y.parent != z) {
                if (y.right != null) x = y.right;
                transplant(y, y.right); // 必无左子
                y.right = z.right;
                y.right.parent = y;
            }
            transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
        }
        //  x        x
        //   \  or  /
        //    z    z
        return x;
    }

    /**
     * 处理 u.parent 与 v 的链接
     *
     * @param u
     * @param v
     */
    private void transplant(Node<T> u, Node<T> v) {
        if (u == root) root = v;
        else if (u == u.parent.left) u.parent.left = v;
        else u.parent.right = v;
        if (v != null) {
            v.parent = u.parent;
        }
    }

    @Override
    public int height() {
        return height(root);
    }

    protected int height(Node node) {
        if (node == null) return 0;
        return Math.max(height(node.left), height(node.right)) + 1;
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
        preorder(root);
    }

    private void preorder(Node node) {
        if (node != null) {
            System.out.println(node.simple());
            preorder(node.left);
            preorder(node.right);
        }
    }

    @Override
    public void inorder() {
        inorder(root);
    }

    private void inorder(Node node) {
        if (node != null) {
            inorder(node.left);
            System.out.println(node.simple());
            inorder(node.right);
        }
    }

    @Override
    public void postorder() {
        postorder(root);
    }

    private void postorder(Node node) {
        if (node != null) {
            postorder(node.left);
            postorder(node.right);
            System.out.println(node.simple());
        }
    }

    @Override
    public void layerOrder() {
        if (root != null) {
            Queue<Node> Q = new LinkedList<>();
            Q.offer(root);
            while (Q.size() > 0) {
                Node node = Q.poll();
                System.out.println(node.simple());
                if (node.left != null) Q.offer(node.left);
                if (node.right != null) Q.offer(node.right);
            }
        }
    }

    @Override
    public String toString() {
        return "BST: " + (root == null ? "empty" : root.toString());
    }

    @Override
    public void tree() {
        root.tree("");
    }
}
