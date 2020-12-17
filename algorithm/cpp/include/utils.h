//
// Created by 超悠閒 on 2020/10/30.
//

#ifndef CPP_UTILS_H
#define CPP_UTILS_H

#include <iostream>

namespace std {

    template<class T>
    void print(T *ts, int len) {
        cout << "[";
        for (int i = 0; i < len; i++) {
            if (i > 0) cout << ", ";
            cout << ts[i];
        }
        cout << "]";
    }

    template<class T>
    void println(T *ts, int len) {
        print(ts, len);
        cout << endl;
    }

    int *range(int, int *);

    int *range(int, int, int *);

    void free(int *, int);
}

#endif //CPP_UTILS_H
