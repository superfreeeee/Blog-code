package adt.bst;

/**
 * 二叉搜索树
 * @param <T>
 */
public interface BinarySearchTree<T> {

    /**
     * 根据键查找元素
     * @param key
     * @return
     */
    T search(int key);

    /**
     * 查找键最小的元素
     * @return
     */
    T minimum();

    /**
     * 查找键最大的元素
     * @return
     */
    T maximum();

    /**
     * 查找给定键的前驱元素
     * @param key
     * @return
     */
    T predecessor(int key);

    /**
     * 查找给定键的后继元素
     * @param key
     * @return
     */
    T successor(int key);

    /**
     * 插入元素并指定键
     * @param key
     * @param t
     */
    void insert(int key, T t);

    /**
     * 删除元素
     */
    void delete(int key);

    /**
     * 展示结构内容
     */
    void info();
}
