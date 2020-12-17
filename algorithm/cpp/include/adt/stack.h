//
// Created by 超悠閒 on 2020/10/30.
//

#ifndef CPP_STACK_H
#define CPP_STACK_H

#include <iostream>
#include "utils.h"

namespace std {

    template<class T>
    class Stack {
    public:
        Stack();

        Stack(int);

        ~Stack();

        void push(const T &);

        T pop();

        T top();

        bool empty();

        void info();

    private:
        void extend();

        T *_array;
        int size;
        int _top;
    };

    template<class T>
    Stack<T>::Stack(): _array(new T[1]), size(1), _top(-1) {}

    template<class T>
    Stack<T>::Stack(int size) :_array(new T[size]), size(size), _top(-1) {}

    template<class T>
    Stack<T>::~Stack<T>() {
        delete[] _array;
    }

    template<class T>
    void Stack<T>::push(const T &t) {
        if (_top == size - 1) extend();
        _array[++_top] = t;
    }

    template<class T>
    T Stack<T>::pop() {
        if (_top < 0) return 0;
        return _array[_top--];
    }

    template<class T>
    T Stack<T>::top() {
        if (_top < 0) return 0;
        return _array[_top];
    }

    template<class T>
    bool Stack<T>::empty() {
        return _top >= 0;
    };

    template<class T>
    void Stack<T>::extend() {
        T *array = new T[size * 2];
        for (int i = 0; i < size; i++) {
            array[i] = _array[i];
        }
        _array = array;
        size *= 2;
    }

    template<class T>
    void Stack<T>::info() {
        cout << "Stack: {size=" << size << ", nums: ";
        std::print(_array, size);
        cout << ", top=" << _top << "}" << endl;
    }
}

#endif //CPP_STACK_H
