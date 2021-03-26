package adt.tree.b;

import org.omg.CORBA.Object;

import java.util.ArrayList;
import java.util.List;

public class BTreeImpl<K extends Comparable<K>, T> implements BTree<K, T> {

    private static class Node<K, T> {
        int n; // 存在关键字个数，n <= 2t-1
        List<K> keys;  // 关键字列表，长度 2t-1，n 个有效
        List<T> values; // 卫星数据
        List<Node<K, T>> children; // 子节点列表，长度 2t，n+1 个有效
        boolean leaf; // 叶节点标记

        Node() {
            n = 0;
            keys = new ArrayList<>();
            values = new ArrayList<>();
        }

        void add(K key, T data) {
            n++;
            keys.add(key);
            values.add(data);
        }
    }

    private final int t; // 最小度数 minimum degree，t >= 2
    private Node<K, T> root;

    public BTreeImpl(int t) {
        this.t = t;
        this.root = new Node<>();
    }

    @Override
    public void insert(K key, T data) {

    }

    @Override
    public T delete(K key) {
        return null;
    }

    @Override
    public T search(K key) {
        Node<K, T> node = root;
        while (node.n > 0) {
            int i = 0;
            int c = 0;
            while (i < node.n && (c = node.keys.get(i).compareTo(key)) < 0) {
                i += 1;
            }
            if (c == 0) return node.values.get(i);
            node = node.children.get(i + (c < 0 ? 1 : 0));
        }
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
    public T predecessor(K key) {
        return null;
    }

    @Override
    public T successor(K key) {
        return null;
    }

    @Override
    public void tree() {

    }

    @Override
    public int height() {
        return 0;
    }

    @Override
    public boolean empty() {
        return false;
    }

    @Override
    public int nodes() {
        return 0;
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
    public void layerorder() {

    }
}
