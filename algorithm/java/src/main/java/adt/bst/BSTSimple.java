package adt.bst;

public class BSTSimple<T> implements BinarySearchTree<T> {

    protected static class Node<T> {
        int key;
        T data;
        Node<T> parent;
        Node<T> left;
        Node<T> right;

        Node(int key, T data) {
            this.key = key;
            this.data = data;
        }

        Node(int key, T data, Node<T> parent, Node<T> left, Node<T> right) {
            this.key = key;
            this.data = data;
            this.parent = parent;
            this.left = left;
            this.right = right;
        }

        public T getData() {
            return data;
        }

        public Node<T> getLeft() {
            return left;
        }

        public Node<T> getRight() {
            return right;
        }

        @Override
        public String toString() {
            return "{key=" + key + ", data=" + data + ", left=" + left + ", right=" + right + '}';
        }
    }

    protected Node<T> root;

    public BSTSimple() {
    }

    public BSTSimple(int[] keys, T[] values) {
        int n = keys.length;
        build(keys, values, 0, n - 1);
    }

    private void build(int[] keys, T[] values, int l, int r) {
        int m = (l + r) / 2;
        insert(keys[m], values[m]);
        if (l < r) {
            build(keys, values, l, m - 1);
            build(keys, values, m + 1, r);
        }
    }

    public T search(int key) {
        return _search(root, key).data;
    }

    protected Node<T> _search(Node<T> cur, int key) {
        while (cur != null) {
            if (key == cur.key) return cur;
            if (key < cur.key) cur = cur.left;
            else cur = cur.right;
        }
        return new Node<T>(0, null);
    }

    protected boolean find(Node<T> cur, int key) {
        return _search(cur, key) != null;
    }

    public T minimum() {
        return root == null ? null : minimum(root).data;
    }

    private Node<T> minimum(Node<T> node) {
        while (node != null && node.left != null) node = node.left;
        return node;
    }

    public T maximum() {
        return root == null ? null : maximum(root).data;
    }

    private Node<T> maximum(Node<T> node) {
        while (node != null && node.right != null) node = node.right;
        return node;
    }

    public T predecessor(int key) {
        Node<T> cur = _search(root, key);
        if (cur.left != null) return maximum(cur.left).data;
        while (cur.parent != null && cur == cur.parent.left) cur = cur.parent;
        return cur.parent == null ? null : cur.parent.data;
    }

    public T successor(int key) {
        Node<T> cur = _search(root, key);
        if (cur.right != null) return minimum(cur.right).data;
        while (cur.parent != null && cur == cur.parent.right) cur = cur.parent;
        return cur.parent == null ? null : cur.parent.data;
    }

    public void insert(int key, T t) {
        Node y = null, x = root, node = new Node<T>(key, t);
        if (x == null) {
            root = node;
            return;
        }
        while (x != null) {
            y = x;
            if (key < x.key) x = x.left;
            else x = x.right;
        }
        if (key < y.key) y.left = node;
        else y.right = node;
        node.parent = y;
    }

    public void delete(int key) {
        Node<T> cur = _search(root, key);
        if (cur == null) return;
        if (cur.left == null) transplant(cur, cur.right);
        else if (cur.right == null) transplant(cur, cur.left);
        else {
            Node<T> post = minimum(cur.right);
            if (post.parent != cur) {
                transplant(post, post.right);
                post.right = cur.right;
                post.right.parent = post;
            }
            transplant(cur, post);
            post.left = cur.left;
            post.left.parent = post;
        }
    }

    private void transplant(Node<T> u, Node<T> v) {
        if (u.parent == null) root = v;
        else if (u == u.parent.left) u.parent.left = v;
        else u.parent.right = v;
        if (v != null) v.parent = u.parent;
    }

    public void info() {
        System.out.println("BST: " + root);
    }
}
