package tree;

import adt.bst.BSTSimple;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * 四种二叉树的遍历
 * 1. 先序遍历
 * 2. 中序遍历
 * 3. 后序遍历
 * 4. 层序遍历
 * @param <T>
 */
public class BSTTraversal<T> extends BSTSimple<T> {

    public BSTTraversal() {
    }

    public BSTTraversal(int[] keys, T[] values) {
        super(keys, values);
    }

    /**
     * 先序遍历
     * @return
     */
    public List<T> preorderTraversal() {
        List<T> res = new ArrayList<>();
        preorder(root, res);
        return res;
    }

    private void preorder(Node<T> node, List<T> res) {
        if (node != null) {
            res.add(node.getData());
            preorder(node.getLeft(), res);
            preorder(node.getRight(), res);
        }
    }

    /**
     * 中序遍历
     * @return
     */
    public List<T> inorderTraversal() {
        List<T> res = new ArrayList<>();
        inorder(root, res);
        return res;
    }

    private void inorder(Node<T> node, List<T> res) {
        if (node != null) {
            inorder(node.getLeft(), res);
            res.add(node.getData());
            inorder(node.getRight(), res);
        }
    }

    /**
     * 后序遍历
     * @return
     */
    public List<T> postorderTraversal() {
        List<T> res = new ArrayList<>();
        postorder(root, res);
        return res;
    }

    private void postorder(Node<T> node, List<T> res) {
        if (node != null) {
            postorder(node.getLeft(), res);
            postorder(node.getRight(), res);
            res.add(node.getData());
        }
    }

    /**
     * 层序遍历
     * @return
     */
    public List<T> layerTraversal() {
        List<T> res = new ArrayList<>();
        if (root == null) return res;
        Queue<Node<T>> Q = new LinkedList<>();
        Q.add(root);
        while (Q.size() > 0) {
            Node<T> cur = Q.poll();
            res.add(cur.getData());
            if (cur.getLeft() != null) Q.add(cur.getLeft());
            if (cur.getRight() != null) Q.add(cur.getRight());
        }
        return res;
    }
}
