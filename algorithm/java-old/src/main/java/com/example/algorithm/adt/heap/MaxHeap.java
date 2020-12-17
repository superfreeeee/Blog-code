package com.example.algorithm.adt.heap;

import com.example.algorithm.adt.priorityqueue.PriorityQueue;

/**
 * 最大堆接口
 */
public abstract class MaxHeap<T> implements PriorityQueue<T> {

    /**
     * 查找下一個元素
     *
     * @return
     */
    public T get() {
        return maximum();
    }

    /**
     * 查找並移除下一個元素
     *
     * @return
     */
    public T extract() {
        return extractMax();
    }

    /**
     * 維持最大堆性質
     * @param i
     */
    abstract public void maxHeapify(int i);

    /**
     * 重新建立最大堆
     * @param A
     */
    abstract public void build(T[] A, int[] keys);

    /**
     * 查找最大元素
     * @return
     */
    abstract public T maximum();

    /**
     * 查找並移除最大元素
     * @return
     */
    abstract public T extractMax();

    /**
     * 插入元素
     * @param key
     * @param data
     */
    abstract public void insert(int key, T data);

    /**
     * 增加元素的鍵
     * @param i
     * @param key
     */
    abstract public void increaseKey(int i, int key);
}
