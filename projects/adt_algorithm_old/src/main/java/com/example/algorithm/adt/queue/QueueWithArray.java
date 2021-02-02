package com.example.algorithm.adt.queue;

/**
 * 隊列（數組實現）
 * @param <T>
 */
public class QueueWithArray<T> implements Queue<T> {

    /**
     * head 隊列頭，指向下一個要出隊的元素
     * tail 隊列尾，指向下一個入隊的存放位置
     * empty 保存隊列是否為空
     */
    private int head = 0;
    private int tail = 0;
    private boolean empty = true;

    /**
     * 隊列元素數組
     */
    private T[] queue;

    public QueueWithArray() {
        this(8);
    }

    public QueueWithArray(int size) {
        this.queue = (T[])new Object[size];
    }

    /**
     * 檢查隊列是否為空
     * @return
     */
    public boolean isEmpty() {
        return empty;
    }

    /**
     * 入隊
     * @param t
     */
    public void enqueue(T t) {
        if(tail == head && !empty) {
            throw new IndexOutOfBoundsException("queue overflow");
        }
        if(empty) {
            empty = false;
        }
        queue[tail] = t;
        tail = (tail + 1) % queue.length;
    }

    /**
     * 出隊
     * @return
     */
    public T dequeue() {
        if(empty) {
            throw new IndexOutOfBoundsException("queue underflow");
        }
        T res = queue[head];
        head = (head + 1) % queue.length;
        if(head == tail) {
            empty = true;
        }
        return res;
    }
}
