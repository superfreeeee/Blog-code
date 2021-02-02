package adt.tree.bst;

import java.util.LinkedList;
import java.util.Queue;

public class BinarySearchTreeImpl<T> implements BinarySearchTree<T> {

    private static class Node<T> {
        int key;
        T data;
        Node<T> parent;
        Node<T> left;
        Node<T> right;

        Node(int key, T data) {
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
    }

    private Node<T> root;

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

    private Node<T> search(Node<T> node, int key) {
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
        Node<T> node = new Node<>(key, data);
        if (root == null) {
            root = node;
            return;
        }
        Node<T> pre = root, cur = (key <= pre.key ? pre.left : pre.right);
        while (cur != null) {
            pre = cur;
            cur = (key <= pre.key ? pre.left : pre.right);
        }
        node.parent = pre;
        if (key <= pre.key) {
            pre.left = node;
        } else {
            pre.right = node;
        }
    }

    @Override
    public T delete(int key) {
        Node<T> target = search(root, key);
        if (target == null) return null;
        if (target.left == null) {
            transparent(target, target.right);
            return target.data;
        } else if (target.right == null) {
            transparent(target, target.left);
            return target.data;
        }
        Node<T> cur = predecessor(target);
        transparent(target, cur);
        if (cur != target.left) {
            cur.left = target.left;
            if (cur.left != null) cur.left.parent = cur;
        }
        if (cur != target.right) {
            cur.right = target.right;
            if (cur.right != null) cur.right.parent = cur;
        }
        assert validate(root);
        return target.data;
    }

    private boolean validate(Node<T> node) {
        if (node == null) return true;
        if (node.left != null && node.left.parent != node ||
                node.right != null && node.right.parent != node) return false;
        return validate(node.left) && validate(node.right);
    }

    private void transparent(Node<T> target, Node<T> cur) {
        if (cur != null) {
            if (cur == cur.parent.left) cur.parent.left = null;
            else cur.parent.right = null;
            cur.parent = target.parent;
        }
        if (target == root) root = cur;
        else if (target == target.parent.left) target.parent.left = cur;
        else target.parent.right = cur;
    }

    @Override
    public int height() {
        return height(root);
    }

    private int height(Node node) {
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

}
