//
// Created by 超悠閒 on 2020/10/31.
//

#ifndef CPP_MYASSERT_H
#define CPP_MYASSERT_H

#include <iostream>

namespace std {

    template<class T>
    void assertEquals(T expected, T actual) {
        if (expected != actual) {
            cout << "AssertEquals Error:" << endl;
            cout << "\texpected: " << expected << endl;
            cout << "\tactual: " << actual << endl;
            throw "";
        }
    }
}

#endif //CPP_MYASSERT_H
