//
// Created by 超悠閒 on 2020/10/31.
//

#ifndef CPP_QUEUE_H
#define CPP_QUEUE_H

#include <iostream>
#include "utils.h"

namespace std {

    template<class T>
    class Queue {
    public:
        Queue();

        Queue(int);

        ~Queue();

        void enqueue(T);

        T dequeue();

        T getFirst();

        T getLast();

        bool empty();

        void info();

    private:
        T *Q;
        int size;
        int front;
        int rear;
        bool full;
    };

    template<class T>
    Queue<T>::Queue(): Q(new T[10]), size(10), front(0), rear(0), full(false) {}

    template<class T>
    Queue<T>::Queue(int size) : Q(new T[size]), size(size), front(0), rear(0), full(false) {}

    template<class T>
    Queue<T>::~Queue() {
        delete[] Q;
    }

    template<class T>
    void Queue<T>::enqueue(T t) {
        if (full) return;
        Q[rear] = t;
        rear = (rear + 1) % size;
        if (rear == front) full = true;
    }

    template<class T>
    T Queue<T>::dequeue() {
        if (front == rear && !full) return 0;
        if (full) full = false;
        T res = Q[front];
        front = (front + 1) % size;
        return res;
    }

    template<class T>
    T Queue<T>::getFirst() {
        return empty() ? 0 : Q[front];
    }

    template<class T>
    T Queue<T>::getLast() {
        return empty() ? 0 : Q[(rear - 1 + size) % size];
    }

    template<class T>
    bool Queue<T>::empty() {
        return front == rear && !full;
    }

    template<class T>
    void Queue<T>::info() {
        cout << "Queue: {Q=";
        print(Q, size);
        cout << ", front=" << front << ", rear=" << rear << ", full=" << full << "}" << endl;
    }
}

#endif //CPP_QUEUE_H
