package adt.queue;

import java.util.Arrays;

public class QueueWithArray<T> implements Queue<T> {

    public QueueWithArray() {
        this(10);
    }

    public QueueWithArray(int size) {
        this.Q = (T[]) new Object[size];
        this.front = this.rear = 0;
        this.full = false;
    }

    private T[] Q;
    private int front;
    private int rear;
    private boolean full;

    @Override
    public void enqueue(T t) {
        if (full) return;
        Q[rear] = t;
        rear = (rear + 1) % Q.length;
        if (rear == front) full = true;
    }

    @Override
    public T dequeue() {
        if (front == rear && !full) return null;
        if (full) full = false;
        T res = Q[front];
        front = (front + 1) % Q.length;
        return res;
    }

    @Override
    public T getFirst() {
        return empty() ? null : Q[front];
    }

    @Override
    public T getLast() {
        return empty() ? null : Q[(rear - 1 + Q.length) % Q.length];
    }

    @Override
    public boolean empty() {
        return front == rear && !full;
    }

    @Override
    public void info() {
        System.out.print("Queue: {Q: ");
        System.out.print(Arrays.toString(Q));
        System.out.println(", front=" + front + ", rear=" + rear + ", full=" + full + "}");
    }
}
