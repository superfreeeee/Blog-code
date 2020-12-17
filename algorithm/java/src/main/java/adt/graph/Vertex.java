package adt.graph;

/**
 * 图节点
 * @param <T>
 */
public interface Vertex<K, T> {

    /**
     * 取得节点 id
     * @return
     */
    K getKey();

    /**
     * 取得节点卫星数据
     * @return
     */
    T getData();

    /**
     * 重新赋值卫星数据
     * @param t
     * @return
     */
    boolean setData(T t);
}
