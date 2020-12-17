package adt.disjointset;

/**
 * 并查集（不相交集合）
 * @param <T>
 */
public interface DisjointSet<T> {

    /**
     * 建立新的集合
     * @param t
     * @return
     */
    boolean create(T t);

    /**
     * 合并集合
     */
    boolean union(T x, T y);

    /**
     * 查找集合
     */
    T find(T x);

    /**
     * 返回集合数量
     */
    int size();

    /**
     * 检查两个元素是否属于同一个集合
     */
    default boolean same(T x, T y) {
        return find(x) == find(y);
    }
}
