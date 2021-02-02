package com.example.algorithm.adt.heap;

import com.example.algorithm.adt.priorityqueue.PriorityQueue;

/**
 * 最小堆接口
 */
public abstract class MinHeap<T> implements PriorityQueue<T> {

    /**
     * 查找下一個元素
     *
     * @return
     */
    public T get() {
        return minimum();
    }

    /**
     * 查找並移除下一個元素
     *
     * @return
     */
    public T extract() {
        return extractMin();
    }

    /**
     * 維持最小堆性質
     * @param i
     */
    abstract public void minHeapify(int i);

    /**
     * 建立最小堆
     * @param A
     */
    abstract public void build(T[] A, int[] keys);

    /**
     * 查找最小元素
     * @return
     */
    abstract public T minimum();

    /**
     * 查找並移除最小元素
     * @return
     */
    abstract public T extractMin();

    /**
     * 插入元素
     * @param key
     * @param data
     */
    abstract public void insert(int key, T data);

    /**
     * 減少元素的鍵
     * @param i
     * @param key
     */
    abstract public void decreaseKey(int i, int key);
}
