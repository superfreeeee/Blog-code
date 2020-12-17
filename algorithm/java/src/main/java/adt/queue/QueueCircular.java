package adt.queue;

import java.util.Arrays;

public class QueueCircular<T> implements Queue<T> {

    public QueueCircular() {
        this(10);
    }

    public QueueCircular(int size) {
        this.Q = (T[]) new Object[size];
        this.front = this.rear = 0;
        this.full = false;
    }

    private T[] Q;
    private int front;
    private int rear;
    private boolean full;

    /**
     * 入队
     *
     * @param t
     */
    @Override
    public void enqueue(T t) {
        if (full) return;
        Q[rear] = t;
        rear = (rear + 1) % Q.length;
        if (rear == front) full = true;
    }

    /**
     * 出队
     *
     * @return
     */
    @Override
    public T dequeue() {
        if (front == rear && !full) return null;
        if (full) full = false;
        T res = Q[front];
        front = (front + 1) % Q.length;
        return res;
    }

    /**
     * 获取队首元素
     *
     * @return
     */
    @Override
    public T getFirst() {
        return empty() ? null : Q[front];
    }

    /**
     * 获取队尾元素
     *
     * @return
     */
    @Override
    public T getLast() {
        return empty() ? null : Q[(rear - 1 + Q.length) % Q.length];
    }

    /**
     * 判断队列是否为空
     *
     * @return
     */
    @Override
    public boolean empty() {
        return front == rear && !full;
    }

    /**
     * 查看细节
     */
    @Override
    public void info() {
        System.out.print("Queue: {Q: ");
        System.out.print(Arrays.toString(Q));
        System.out.println(", front=" + front + ", rear=" + rear + ", full=" + full + "}");
    }
}
