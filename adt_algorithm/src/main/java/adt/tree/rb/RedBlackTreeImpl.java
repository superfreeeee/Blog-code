package adt.tree.rb;

import java.util.LinkedList;
import java.util.Queue;

public class RedBlackTreeImpl<K extends Comparable<K>, T> implements RedBlackTree<K, T> {

    private static final boolean RED = false, BLACK = true;

    private static class Node<K, T> {
        K key;
        T data;
        boolean color;
        Node<K, T> left;
        Node<K, T> right;
        Node<K, T> parent;

        public Node(K key, T data) {
            this.key = key;
            this.data = data;
            this.color = RED;
        }

        @Override
        public String toString() {
            return "{" + key + "(" + (color ? "Black" : "Red") + "):" + data + "}";
        }
    }

    private Node<K, T> NIL;
    private Node<K, T> root;

    public RedBlackTreeImpl() {
        NIL = new Node<>(null, null);
        NIL.color = BLACK;
        root = NIL.parent = NIL.left = NIL.right = NIL;
    }

    private Node<K, T> createNode(K key, T data) {
        Node<K, T> node = new Node<>(key, data);
        node.parent = node.left = node.right = NIL;
        return node;
    }

    @Override
    public T search(K key) {
        return search(root, key).data;
    }

    private Node<K, T> search(Node<K, T> node, K key) {
        while (node != NIL && node.key.compareTo(key) != 0) {
            node = key.compareTo(node.key) < 0 ? node.left : node.right;
        }
        return node;
    }

    @Override
    public T minimum() {
        return minimum(root).data;
    }

    private Node<K, T> minimum(Node<K, T> node) {
        while (node.left != NIL) {
            node = node.left;
        }
        return node;
    }

    @Override
    public T maximum() {
        return maximum(root).data;
    }

    private Node<K, T> maximum(Node<K, T> node) {
        while (node.right != NIL) {
            node = node.right;
        }
        return node;
    }

    @Override
    public T predecessor(K key) {
        Node<K, T> node = searchClosest(key);
        if (node == NIL) return null;
        if (node.key.compareTo(key) < 0) return node.data;
        return predecessor(node).data;
    }

    private Node<K, T> predecessor(Node<K, T> node) {
        if (node.left != NIL) return maximum(node.left);
        while (node != NIL && node == node.parent.left) {
            node = node.parent;
        }
        return node.parent;
    }

    private Node<K, T> searchClosest(K key) {
        Node<K, T> pre = NIL, cur = root;
        while (cur != NIL && cur.key.compareTo(key) != 0) {
            pre = cur;
            cur = cur.key.compareTo(key) < 0 ? cur.right : cur.left;
        }
        return cur == NIL ? pre : cur;
    }

    @Override
    public T successor(K key) {
        Node<K, T> node = searchClosest(key);
        if (node == NIL) return null;
        if (node.key.compareTo(key) > 0) return node.data;
        return successor(node).data;
    }

    private Node<K, T> successor(Node<K, T> node) {
        if (node.right != NIL) return minimum(node.right);
        while (node != NIL && node == node.parent.right) {
            node = node.parent;
        }
        return node.parent;
    }

    @Override
    public void tree() {
        if (root == NIL) {
            System.out.println("empty tree");
        } else {
            tree(root, "");
        }
    }

    private void tree(Node<K, T> node, String prefix) {
        if (node != NIL) {
            System.out.println(prefix + node);
            prefix = prefix + "  ";
            tree(node.left, prefix);
            if (node.left == NIL && node.right != NIL)
                System.out.println(prefix + "NIL");
            tree(node.right, prefix);
        }
    }

    @Override
    public void insert(K key, T data) {
        Node<K, T> node = createNode(key, data);
        Node<K, T> pre = NIL, cur = root;
        while (cur != NIL) {
            pre = cur;
            cur = key.compareTo(cur.key) <= 0 ? cur.left : cur.right;
        }
        node.parent = pre;
        if (pre == NIL) {
            root = node;
        } else if (key.compareTo(pre.key) <= 0) {
            pre.left = node;
        } else {
            pre.right = node;
        }
        insertFixUp(node);
    }

    /**
     * 查找叔节点
     *
     * @param node
     * @return
     */
    private Node<K, T> uncle(Node<K, T> node) {
        if (node.parent == NIL || node.parent.parent == NIL) return NIL;
        if (node.parent == node.parent.parent.left) return node.parent.parent.right;
        return node.parent.parent.left;
    }

    // 左旋转
    private void leftRotate(Node<K, T> x) {
//          y        x
//         / \      / \
//        x   c <- a   y
//       / \          / \
//      a   b        b   c
        Node<K, T> y = x.right;
        // y & x.p
        y.parent = x.parent;
        if (x == root) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        // x & y.left
        x.right = y.left;
        if (x.right != NIL) x.right.parent = x;
        // x & y
        y.left = x;
        x.parent = y;
    }

    // 右旋转
    private void rightRotate(Node<K, T> y) {
//          y        x
//         / \      / \
//        x   c -> a   y
//       / \          / \
//      a   b        b   c
        Node<K, T> x = y.left;
        // x & y.p
        x.parent = y.parent;
        if (y == root) root = x;
        else if (y == y.parent.left) y.parent.left = x;
        else y.parent.right = x;
        // y & x.right
        y.left = x.right;
        if (y.left != NIL) y.left.parent = y;
        // x & y
        x.right = y;
        y.parent = x;
    }

    /**
     * 插入修正
     *
     * @param z
     */
    private void insertFixUp(Node<K, T> z) {
        while (z.parent.color == RED) {
            Node<K, T> y = uncle(z);
            // case 1
            if (y.color == RED) {
//                ?:B            ?:R
//              /   \          /   \
//             ?:R   y:R ->   ?:B   ?:B
//           /              /
//          z:R            z:R
                z.parent.color = y.color = BLACK;
                y.parent.color = RED;
                z = y.parent;
                continue;
            }

            // case 2
//                ?:B            ?:B
//              /   \          /   \
//             ?:R   ?:B ->   ?:B   ?:B
//              \            /
//               z:R        z:R
            if (z == innerChild(z)) {
                if (z == z.parent.right) {
                    leftRotate(z.parent);
                    z = z.left;
                } else {
                    rightRotate(z.parent);
                    z = z.right;
                }
            }

            // case 3
            z.parent.color = BLACK;
            z.parent.parent.color = RED;
            if (z == z.parent.left) {
                rightRotate(z.parent.parent);
            } else {
                leftRotate(z.parent.parent);
            }
        }
        root.color = BLACK;
    }

    @Override
    public T delete(K key) {
        Node<K, T> z = search(root, key), x;
        if (z == NIL) return null;
        boolean originColor = z.color;
        if (z.left == NIL) {
            x = z.right;
            transplant(z, z.right);
        } else if (z.right == NIL) {
            x = z.left;
            transplant(z, z.left);
        } else {
            Node<K, T> y = minimum(z.right); // 找后继
            originColor = y.color;
            x = y.right; // 后继必无左子
            if (y.parent == z) {
                x.parent = z;
            } else {
                transplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (originColor == BLACK) {
            deleteFixUp(x);
        }
        return z.data;
    }

    /**
     * v 与 u.p 之间的联系
     *
     * @param u
     * @param v
     */
    private void transplant(Node<K, T> u, Node<K, T> v) {
        if (u.parent == NIL) root = v;
        else if (u == u.parent.left) u.parent.left = v;
        else u.parent.right = v;
        v.parent = u.parent;
    }

    // 兄弟节点
    private Node<K, T> brother(Node<K, T> x) {
        if (x.parent == NIL) return NIL;
        return x == x.parent.left ? x.parent.right : x.parent.left;
    }

    // 外则子节点：LL、RR
    private Node<K, T> outerChild(Node<K, T> x) {
        return x == x.parent.left ? x.left : x.right;
    }

    // 内侧子节点：LR、RL
    private Node<K, T> innerChild(Node<K, T> x) {
        return x == x.parent.right ? x.left : x.right;
    }

    /**
     * 删除修正
     *
     * @param x
     */
    private void deleteFixUp(Node<K, T> x) {
        while (x != root && x.color == BLACK) {
            Node<K, T> w = brother(x);
            if (w.color == RED) {
                // case 1
//                ?:B               w:B
//              /   \             /   \
//             x:B   w:R   ->    ?:R   b:B
//                 /   \       /   \
//                a:B   b:B   x:B   a:B
                w.color = BLACK;
                x.parent.color = RED;
                leftRotate(x.parent);
                w = brother(x);
            }
            if (w.left.color == BLACK && w.right.color == BLACK) {
                // case 2
//                ?:R               ?:R
//              /   \             /   \
//             x:B   w:B   ->    x:B   w:R
//                 /   \             /   \
//                a:B   b:B         a:B   a:B
                w.color = RED;
                x = x.parent;
            } else {
                if (outerChild(w).color == BLACK) {
                    // case 3
//                ?:R               ?:R
//              /   \             /   \
//             x:B   w:B   ->    x:B   w:R
//                 /   \             /   \
//                a:R   b:B         a:B   a:B
                    innerChild(w).color = BLACK;
                    w.color = RED;
                    if (w == w.parent.right) {
                        rightRotate(w);
                    } else {
                        leftRotate(w);
                    }
                    w = brother(x);
                }
                // case 4
//                ?:?                w:?
//              /   \              /   \
//             x:B   w:B   ->     ?:B   b:B
//                 /   \        /   \
//                a:?   b:R    x:B   a:?
                w.color = x.parent.color;
                x.parent.color = BLACK;
                outerChild(w).color = BLACK;
                if (w == w.parent.right) {
                    leftRotate(x.parent);
                } else {
                    rightRotate(x.parent);
                }
                x = root;
            }
        }
        x.color = BLACK;
    }

    /**
     * 返回树的黑高
     *
     * @return
     */
    @Override
    public int height() {
        return height(root);
    }

    private int height(Node<K, T> node) {
        if (node == NIL) return 0;
        int L = height(node.left);
        int R = height(node.right);
        int h = Math.max(L, R) + (node.color == BLACK ? 1 : 0);
        return h;
    }

    @Override
    public boolean empty() {
        return root == NIL;
    }

    @Override
    public int nodes() {
        return nodes(root);
    }

    private int nodes(Node<K, T> node) {
        if (node == NIL) return 0;
        return nodes(node.left) + nodes(node.right) + 1;
    }

    @Override
    public void preorder() {
        preorder(root);
    }

    private void preorder(Node<K, T> node) {
        if (node != NIL) {
            System.out.println(node);
            preorder(node.left);
            preorder(node.right);
        }
    }

    @Override
    public void inorder() {
        inorder(root);
    }

    private void inorder(Node<K, T> node) {
        if (node != NIL) {
            inorder(node.left);
            System.out.println(node);
            inorder(node.right);
        }
    }

    @Override
    public void postorder() {
        postorder(root);
    }

    private void postorder(Node<K, T> node) {
        if (node != NIL) {
            postorder(node.left);
            postorder(node.right);
            System.out.println(node);
        }
    }

    @Override
    public void layerorder() {
        if (root == NIL) return;
        Queue<Node<K, T>> Q = new LinkedList<>();
        Q.offer(root);
        while (Q.size() > 0) {
            Node<K, T> node = Q.poll();
            System.out.println(node);
            if (node.left != NIL) Q.offer(node.left);
            if (node.right != NIL) Q.offer(node.right);
        }
    }

    @Override
    public void validate() {
        assert root.color == BLACK && NIL.color == BLACK;
        validate(root, height(), 0);
    }

    private void validate(Node<K, T> x, int h, int cur) {
        if (x == NIL) {
            assert h == cur;
            return;
        }
        assert x.color != RED || x.left.color == BLACK && x.right.color == BLACK;
        if (x.color == BLACK) cur++;
        validate(x.left, h, cur);
        validate(x.right, h, cur);
    }
}
