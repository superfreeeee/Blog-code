package com.example.algorithm.adt.stack;

/**
 * 棧（鏈表實現）
 */
public class StackWithLinkedList<T> implements Stack<T> {

    /**
     * 棧頂指針
     */
    private StackNode<T> top;

    /**
     * 檢查棧是否為空
     */
    public boolean isEmpty() {
        return top == null;
    }

    /**
     * 壓棧
     * @param data
     */
    public void push(T data) {
        StackNode<T> node = new StackNode<T>(data);
        node.prev = top;
        top = node;
    }

    /**
     * 出棧
     * @return
     */
    public T pop() {
        StackNode<T> res = top;
        top = top.prev;
        return res.data;
    }

    /**
     * 棧內部節點
     * @param <T>
     */
    private static final class StackNode<T> {
        T data;
        StackNode<T> prev;

        StackNode(T data) {
            this.data = data;
            this.prev = null;
        }
    }
}
