package adt.graph;

import java.util.ArrayList;
import java.util.List;

/**
 * 有向图的邻接矩阵实现
 *
 * @param <K>
 * @param <T>
 * @param <W>
 */
public class DirectedGraphWithAdjMatrix<K, T, W> implements Graph<K, T, W> {

    private K[] vertexKeyList;
    private T[] vertexDataList;
    private W[][] edgeMatrix;
    private int capacity;
    private int size;

    public DirectedGraphWithAdjMatrix(int capacity) {
        this.capacity = capacity;
        vertexKeyList = (K[]) new Object[capacity];
        vertexDataList = (T[]) new Object[capacity];
        edgeMatrix = (W[][]) new Object[capacity][capacity];
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
        List<Vertex<K, T>> vertices = new ArrayList<>();
        for (int i = 0; i < size; i++) vertices.add(getVertex(i));
        return vertices;
    }

    @Override
    public List<Vertex<K, T>> getAdjVertices(K key) {
        List<Vertex<K, T>> vertices = new ArrayList<>();
        int i = getId(key);
        if (i < 0) return vertices;
        for (int j = 0; j < size; j++) {
            if (edgeMatrix[i][j] != null) {
                Vertex<K, T> v = getVertex(j);
                vertices.add(v);
            }
        }
        return vertices;
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

    private void extend() {
        int c = capacity * 2;

        K[] newVertexKeyList = (K[]) new Object[c];
        T[] newVertexDataList = (T[]) new Object[c];
        W[][] newEdgeMatrix = (W[][]) new Object[c][c];
        for (int i = 0; i < size; i++) {
            newVertexKeyList[i] = vertexKeyList[i];
            newVertexDataList[i] = vertexDataList[i];
            for (int j = 0; j < size; j++) {
                newEdgeMatrix[i][j] = edgeMatrix[i][j];
            }
        }
        vertexKeyList = newVertexKeyList;
        vertexDataList = newVertexDataList;
        edgeMatrix = newEdgeMatrix;
        capacity = c;
    }

    @Override
    public List<Edge<K, T, W>> getEdges() {
        List<Edge<K, T, W>> edges = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (edgeMatrix[i][j] != null) {
                    Vertex<K, T> from = getVertex(i), to = getVertex(j);
                    Edge<K, T, W> edge = new DefaultEdge<>(from, to, edgeMatrix[i][j]);
                    edges.add(edge);
                }
            }
        }
        return edges;
    }

    @Override
    public List<Edge<K, T, W>> getAdjEdges(K key) {
        List<Edge<K, T, W>> edges = new ArrayList<>();
        int i = getId(key);
        if (i < 0) return edges;
        Vertex<K, T> from = getVertex(i);
        for (int j = 0; j < size; j++) {
            if (edgeMatrix[i][j] != null) {
                Vertex<K, T> to = getVertex(j);
                Edge<K, T, W> edge = new DefaultEdge<>(from, to, edgeMatrix[i][j]);
                edges.add(edge);
            }
        }
        return edges;
    }

    @Override
    public boolean addEdge(K fromKey, K toKey, W weight) {
        int i = getId(fromKey), j = getId(toKey);
        if (i < 0 || j < 0) return false;
        edgeMatrix[i][j] = weight;
        return true;
    }
}
