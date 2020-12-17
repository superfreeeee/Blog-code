package com.example.algorithm.adt.priorityqueue;

public interface PriorityQueue<T> {

    /**
     * 查找下一個元素
     * @return
     */
    T get();

    /**
     * 查找並移除下一個元素
     * @return
     */
    T extract();

    /**
     * 插入元素
     * @param key
     * @param data
     */
    void insert(int key, T data);
}
