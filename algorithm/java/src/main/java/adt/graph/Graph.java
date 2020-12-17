package adt.graph;

import java.util.List;

/**
 * 图
 *
 * @param <T>
 */
public interface Graph<K, T, W> {

    class DefaultVertex<K, T> implements Vertex<K, T> {
        private K key;
        private T data;

        public DefaultVertex(K key, T data) {
            this.key = key;
            this.data = data;
        }

        /**
         * 取得节点 id
         *
         * @return
         */
        @Override
        public K getKey() {
            return key;
        }

        /**
         * 取得节点卫星数据
         *
         * @return
         */
        @Override
        public T getData() {
            return data;
        }

        /**
         * 重新赋值卫星数据
         *
         * @param t
         * @return
         */
        @Override
        public boolean setData(T t) {
            if (t == null) return false;
            data = t;
            return true;
        }

        @Override
        public String toString() {
            if (data == null) {
                return String.valueOf(key);
            }
            return "(key=" + key + ", data=" + data + ')';
        }
    }

    class DefaultEdge<K, T, W> implements Edge<K, T, W> {
        private Vertex<K, T> from;
        private Vertex<K, T> to;
        private W weight;

        public DefaultEdge(Vertex<K, T> from, Vertex<K, T> to) {
            this.from = from;
            this.to = to;
            this.weight = (W)Edge.nil;
        }

        public DefaultEdge(Vertex<K, T> from, Vertex<K, T> to, W weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }

        /**
         * 边离开的节点
         *
         * @return
         */
        @Override
        public Vertex<K, T> from() {
            return from;
        }

        /**
         * 边进入的节点
         *
         * @return
         */
        @Override
        public Vertex<K, T> to() {
            return to;
        }

        /**
         * 获取边权重/卫星数据
         *
         * @return
         */
        @Override
        public W getWeight() {
            return weight;
        }

        @Override
        public String toString() {
            if (weight == Edge.nil) {
                return "" + '{' + from + " -> " + to + '}';
            }
            return "{" + from + " -> " + to + ", weight=" + weight + '}';
        }
    }

    /**
     * 获取所有节点
     *
     * @return
     */
    List<Vertex<K, T>> getVertices();

    /**
     * 获取所有邻接节点
     *
     * @param key
     * @return
     */
    List<Vertex<K, T>> getAdjVertices(K key);

    /**
     * 添加节点
     *
     * @param key
     * @return
     */
    default boolean addVertex(K key) {
        return addVertex(key, null);
    }

    /**
     * 添加节点和卫星数据
     *
     * @param key
     * @param data
     * @return
     */
    boolean addVertex(K key, T data);

    default boolean[] addVertices(K[] keys) {
        int n = keys.length;
        boolean[] res = new boolean[n];
        for (int i = 0; i < n; i++) res[i] = addVertex(keys[i], null);
        return res;
    }

    default boolean[] addVertices(K[] keys, T[] dataList) {
        int n = keys.length;
        boolean[] res = new boolean[n];
        for (int i = 0; i < n; i++) res[i] = addVertex(keys[i], dataList[i]);
        return res;
    }

    /**
     * 获取所有边
     *
     * @return
     */
    List<Edge<K, T, W>> getEdges();

    /**
     * 获取所有出边
     *
     * @param key
     * @return
     */
    List<Edge<K, T, W>> getAdjEdges(K key);

    /**
     * 添加边
     * @param fromKey
     * @param toKey
     * @return
     */
    default boolean addEdge(K fromKey, K toKey) {
        return addEdge(fromKey, toKey, (W)Edge.nil);
    }

    /**
     * 添加边
     *
     * @param fromKey
     * @param toKey
     * @param weight
     * @return
     */
    boolean addEdge(K fromKey, K toKey, W weight);

    default boolean[] addEdges(K[] fromKeys, K[] toKeys) {
        int n = fromKeys.length;
        boolean[] res = new boolean[n];
        for (int i = 0; i < n; i++) res[i] = addEdge(fromKeys[i], toKeys[i]);
        return res;
    }

    default boolean[] addEdges(K[] fromKeys, K[] toKeys, W[] weights) {
        int n = fromKeys.length;
        boolean[] res = new boolean[n];
        for (int i = 0; i < n; i++) res[i] = addEdge(fromKeys[i], toKeys[i], weights[i]);
        return res;
    }
}
