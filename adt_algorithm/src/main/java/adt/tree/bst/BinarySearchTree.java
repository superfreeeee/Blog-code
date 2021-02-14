package adt.tree.bst;

import adt.tree.Tree;

/**
 * 二叉搜索树
 *
 * @param <T>
 */
public interface BinarySearchTree<K extends Comparable<K>, T> extends Tree<K, T> {

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
}
