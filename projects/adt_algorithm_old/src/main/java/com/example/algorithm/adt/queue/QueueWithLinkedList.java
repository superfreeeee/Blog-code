package com.example.algorithm.adt.queue;

/**
 * 隊列（鏈表實現）
 * @param <T>
 */
public class QueueWithLinkedList<T> implements Queue<T> {

    /**
     * head 列頭指針
     * tail 列尾指針
     */
    private QueueNode<T> head;
    private QueueNode<T> tail;

    /**
     * 判斷隊列是否為空
     *
     * @return
     */
    public boolean isEmpty() {
        return head == null;
    }

    /**
     * 入隊
     *
     * @param data
     */
    public void enqueue(T data) {
        QueueNode<T> node = new QueueNode<T>(data);
        if(head == null) {
            head = tail = node;
        } else {
            tail = tail.next = node;
        }
    }

    /**
     * 出隊
     *
     * @return
     */
    public T dequeue() {
        QueueNode<T> node = head;
        head = head.next;
        return node.data;
    }

    private static final class QueueNode<T> {
        T data;
        QueueNode<T> next;

        QueueNode(T data) {
            this.data = data;
            this.next = null;
        }
    }
}
