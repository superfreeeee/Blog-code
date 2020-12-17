package com.example.algorithm.adt.stack;

/**
 * 棧接口
 * @param <T>
 */
public interface Stack<T> {
    /**
     * 檢查棧是否為空
     */
    boolean isEmpty();

    /**
     * 壓棧
     * @param data
     */
    void push(T data);

    /**
     * 出棧
     * @return
     */
    T pop();
}
