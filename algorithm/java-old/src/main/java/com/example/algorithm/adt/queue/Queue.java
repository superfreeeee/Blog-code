package com.example.algorithm.adt.queue;

/**
 * 隊列接口
 * @param <T>
 */
public interface Queue<T> {

    /**
     * 判斷隊列是否為空
     * @return
     */
    boolean isEmpty();

    /**
     * 入隊
     * @param data
     */
    void enqueue(T data);

    /**
     * 出隊
     * @return
     */
    T dequeue();
}
