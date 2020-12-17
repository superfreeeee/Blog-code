package adt.graph;

import java.util.ArrayList;
import java.util.List;

/**
 * 有向图的邻接表实现
 *
 * @param <K>
 * @param <T>
 * @param <W>
 */
public class DirectedGraphWithAdjList<K, T, W> implements Graph<K, T, W> {

    /**
     * 出边信息链表节点类
     * @param <W>
     */
    private static class EdgeListNode<W> {
        int adjId;
        W weight;
        EdgeListNode<W> next;

        public EdgeListNode(int adjId) {
            this.adjId = adjId;
            this.weight = (W) Edge.nil;
        }

        public EdgeListNode(int adjId, W weight) {
            this.adjId = adjId;
            this.weight = weight;
        }
    }

    private K[] vertexKeyList;
    private T[] vertexDataList;
    private EdgeListNode<W>[] edgeList;
    private int capacity;
    private int size;

    public DirectedGraphWithAdjList(int capacity) {
        this.capacity = capacity;
        vertexKeyList = (K[]) new Object[capacity];
        vertexDataList = (T[]) new Object[capacity];
        edgeList = new EdgeListNode[capacity];
    }

    /**
     * 由 key 查找 id
     *
     * @param key
     * @return
     */
    private int getId(K key) {
        for (int i = 0; i < size; i++) {
            if (vertexKeyList[i].equals(key)) return i;
        }
        return -1;
    }

    /**
     * 根据偏移量生成节点对象
     *
     * @param id
     * @return
     */
    private Vertex<K, T> getVertex(int id) {
        return new DefaultVertex<>(vertexKeyList[id], vertexDataList[id]);
    }

    @Override
    public List<Vertex<K, T>> getVertices() {
        List<Vertex<K, T>> res = new ArrayList<>();
        for (int i = 0; i < size; i++) res.add(getVertex(i));
        return res;
    }

    @Override
    public List<Vertex<K, T>> getAdjVertices(K key) {
        List<Vertex<K, T>> res = new ArrayList<>();
        int i = getId(key);
        if (i < 0) return res;
        EdgeListNode node = edgeList[i];
        while (node != null) {
            res.add(getVertex(node.adjId));
            node = node.next;
        }
        return res;
    }

    @Override
    public boolean addVertex(K key, T data) {
        for (int i = 0; i < size; i++) {
            if (vertexKeyList[i].equals(key)) return false;
        }
        vertexKeyList[size] = key;
        vertexDataList[size] = data;
        size++;
        return true;
    }

    @Override
    public List<Edge<K, T, W>> getEdges() {
        List<Edge<K, T, W>> res = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            Vertex<K, T> from = getVertex(i);
            EdgeListNode<W> node = edgeList[i];
            while (node != null) {
                Vertex<K, T> to = getVertex(node.adjId);
                res.add(new DefaultEdge<>(from, to, (W) node.weight));
                node = node.next;
            }
        }
        return res;
    }

    @Override
    public List<Edge<K, T, W>> getAdjEdges(K key) {
        List<Edge<K, T, W>> res = new ArrayList<>();
        int i = getId(key);
        if (i < 0) return res;
        EdgeListNode<W> node = edgeList[i];
        Vertex<K, T> from = getVertex(i);
        while (node != null) {
            Vertex<K, T> to = getVertex(node.adjId);
            res.add(new DefaultEdge<>(from, to, (W) node.weight));
            node = node.next;
        }
        return res;
    }

    @Override
    public boolean addEdge(K fromKey, K toKey, W weight) {
        int i = getId(fromKey), j = getId(toKey);
        if (i < 0 || j < 0) return false;
        EdgeListNode<W> node = new EdgeListNode<>(j, weight);
        if (edgeList[i] == null) {
            edgeList[i] = node;
        } else {
            EdgeListNode<W> cur = edgeList[i];
            while (cur.next != null) cur = cur.next;
            cur.next = node;
        }
        return true;
    }
}
