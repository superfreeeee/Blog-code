package adt.graph;

/**
 * 图边
 */
public interface Edge<K, T, W> {

    Object nil = new Object();

    /**
     * 边离开的节点
     * @return
     */
    Vertex<K, T> from();

    /**
     * 边进入的节点
     * @return
     */
    Vertex<K, T> to();

    /**
     * 获取边权重/卫星数据
     * @return
     */
    W getWeight();
}
