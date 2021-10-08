//
// Created by 超悠閒 on 2021/10/8.
//

#include "clint.h"
#include <stdio.h>

int add_l(CLINT a_l, CLINT b_l, CLINT c_l) {
    clint i = 0;
    clint c = 0;
    UINT t;

    clint m = a_l[0];
    clint n = b_l[0];

    while (i < m || i < n) {
        i++;

        clint a = i <= m ? a_l[i] : 0;
        clint b = i <= n ? b_l[i] : 0;
        t = a + b + c;

        c_l[i] = t % DIGIT_BASE;
        c = t / DIGIT_BASE;
    }

    if (c > 0) {
        c_l[++i] = c;
    }
    c_l[0] = i;

    return E_CLINT_OK;
}
