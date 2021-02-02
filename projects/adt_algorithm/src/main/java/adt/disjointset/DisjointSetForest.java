package adt.disjointset;

import java.util.*;

/**
 * 并查集森林（每个集合为一棵树）实现
 */
public class DisjointSetForest<T> implements DisjointSet<T> {

    /**
     * 内部树节点类
     *
     * @param <T>
     */
    private static class Node<T> {
        T t;
        Node<T> p;
        int depth;

        Node(T t) {
            this.t = t;
            this.p = this;
            depth = 1;
        }
    }

    /**
     * 保存所有集合的根节点
     */
    private List<Node<T>> forest;
    /**
     * 保存值到节点的映射
     */
    private Map<T, Node<T>> mapper;

    DisjointSetForest() {
        forest = new LinkedList<>();
        mapper = new HashMap<>();
    }

    DisjointSetForest(List<T> initialSets) {
        forest = new LinkedList<>();
        mapper = new HashMap<>();
        for (T t : initialSets) {
            Node<T> n = new Node<>(t);
            forest.add(n);
            mapper.put(t, n);
        }
    }

    @Override
    public boolean create(T t) {
        Node<T> n = new Node<>(t);
        mapper.put(t, n);
        return forest.add(n);
    }

    /**
     * 按秩合并
     *
     * @param x
     * @param y
     * @return
     */
    @Override
    public boolean union(T x, T y) {
        Node<T> n1 = findNode(x);
        Node<T> n2 = findNode(y);
        if (n1 == null || n2 == null) return false;
        if (n1.depth > n2.depth) {
            n2.p = n1;
        } else {
            n1.p = n2;
            if (n1.depth == n2.depth) {
                n2.depth++;
            }
        }
        return true;
    }

    @Override
    public T find(T x) {
        Node<T> n = findNode(x);
        return n == null ? null : n.t;
    }

    private Node<T> findNode(T x) {
        Node<T> n = mapper.get(x);
        if (n == null) {
            return null;
        }
        return findNode(n);
    }

    /**
     * 带路径压缩的搜索
     *
     * @param n
     * @return
     */
    private Node<T> findNode(Node<T> n) {
        if (n != n.p) {
            n.p = findNode(n.p);
        }
        return n.p;
    }

    @Override
    public int size() {
        return forest.size();
    }

    @Override
    public String toString() {
        Map<T, List<T>> sets = new HashMap<>();
        for (T t : mapper.keySet()) {
            T root = find(t);
            if (!sets.containsKey(root)) {
                sets.put(root, new ArrayList<>());
            }
            sets.get(root).add(t);
        }
        StringBuilder res = new StringBuilder();
        for (T present : sets.keySet()) {
            res.append(present);
            res.append(":");
            res.append(sets.get(present));
            res.append("\n");
        }
        return res.toString();
    }
}
