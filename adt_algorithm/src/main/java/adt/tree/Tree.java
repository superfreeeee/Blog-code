package adt.tree;

/**
 * 树
 *
 * @param <T>
 */
public interface Tree<K extends Comparable<K>, T> {

    /**
     * 插入节点
     *
     * @param key
     * @param data
     */
    void insert(K key, T data);

    /**
     * 删除节点
     *
     * @param key
     * @return
     */
    T delete(K key);


    /**
     * 根据键查找元素
     *
     * @param key
     * @return
     */
    T search(K key);

    /**
     * 查找键最小的元素
     *
     * @return
     */
    T minimum();

    /**
     * 查找键最大的元素
     *
     * @return
     */
    T maximum();

    /**
     * 查找给定键的前驱元素
     *
     * @param key
     * @return
     */
    T predecessor(K key);

    /**
     * 查找给定键的后继元素
     *
     * @param key
     * @return
     */
    T successor(K key);

    /**
     * 展示树形结构
     */
    void tree();

    /**
     * 返回树高
     *
     * @return
     */
    int height();

    /**
     * 检查树是否为空
     *
     * @return
     */
    boolean empty();

    /**
     * 返回节点数量
     *
     * @return
     */
    int nodes();

    /**
     * 先序遍历
     */
    void preorder();

    /**
     * 中序遍历
     */
    void inorder();

    /**
     * 后序遍历
     */
    void postorder();

    /**
     * 层序遍历
     */
    void layerorder();
}
