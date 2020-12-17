package com.example.algorithm.adt.stack;

/**
 * 棧（數組實現）
 * @param <T>
 */
public class StackWithArray<T> implements Stack<T> {

    /**
     * 棧頂指針
     * @value -1 棧為空
     */
    private int top = -1;

    /**
     * 棧元素的數組
     */
    private T[] stack;

    public StackWithArray() {
        this(8);
    }

    public StackWithArray(int size) {
        this.stack = (T[])new Object[size];
    }

    /**
     * 檢查棧是否為空
     * @return
     */
    public boolean isEmpty() {
        return top < 0;
    }

    /**
     * 元素壓棧
     * @param t 入棧元素
     */
    public void push(T t) {
        if(top >= stack.length - 1) {
            throw new IndexOutOfBoundsException("stack overflow");
        }
        stack[++top] = t;
    }

    /**
     * 元素出棧
     * @return
     */
    public T pop() {
        if(top < 0) {
            throw new IndexOutOfBoundsException("stack underflow");
        }
        return stack[top--];
    }

}
