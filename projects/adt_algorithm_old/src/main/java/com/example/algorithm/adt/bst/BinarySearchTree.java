package com.example.algorithm.adt.bst;


/**
 * 二叉搜索樹
 * @param <T>
 */
public interface BinarySearchTree<T> extends WalkableTree {

    /**
     * 查找元素
     * @param key
     * @return
     */
    T search(int key);

    /**
     * 最大元素
     * @return
     */
    T maximum();

    /**
     * 最小元素
     * @return
     */
    T minimum();

    /**
     * 後繼元素
     * @param key
     * @return
     */
    T successor(int key);

    /**
     * 前驅元素
     * @param key
     * @return
     */
    T predecessor(int key);

    /**
     * 插入元素
     * @param key
     * @param data
     */
    void insert(int key, T data);

    /**
     * 刪除元素
     * @param key
     * @return
     */
    T delete(int key);

}
