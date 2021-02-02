package com.example.algorithm.adt.linkedlist;

/**
 * 鏈表接口
 * @param <T>
 */
public interface LinkedList<T> {

    /**
     * 判斷鏈表是否為空
     * @return
     */
    boolean isEmpty();

    /**
     * 查找元素
     * @param key
     * @return
     */
    T search(int key);

    /**
     * 插入元素
     * @param data
     * @return
     */
    int insert(T data);

    /**
     * 刪除元素
     * @param key
     * @return
     */
    T remove(int key);
}
