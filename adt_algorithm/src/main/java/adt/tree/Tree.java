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
