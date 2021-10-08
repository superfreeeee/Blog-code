#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "types.h"
#include "clint.h"

char to_hex(UCHAR uchar) {
    if (uchar < 10) {
        return '0' + uchar;
    } else {
        return 'a' + uchar - 10;
    }
}

char *short_to_hex(USHORT ushort) {
    char *hex = (char *) malloc(sizeof(char) * 4);
    for (int i = 3; i >= 0; i--) {
        hex[i] = to_hex(ushort & 0xf);
        ushort >>= 4;
    }
    return hex;
}

char *clint_to_hex(CLINT clint1) {
    clint len = clint1[0];
    char *str = (char *) malloc(sizeof(char) * (len * 4));

    int i = len;
    while (i > 0) {
        char *piece = short_to_hex(clint1[len - i + 1]);
        memcpy(str + (i - 1) * 4, piece, 4);
        free(piece);
        i--;
    }
    return str;
}

int main() {
//    printf("to_hex(7)  = %c\n", to_hex(7));
//    printf("to_hex(10) = %c\n", to_hex(10));
//    printf("to_hex(13) = %c\n", to_hex(13));
//    printf("to_hex(15) = %c\n", to_hex(15));
//    printf("short_to_hex(0x12ef) = %s\n", short_to_hex(0x12ef));

    CLINT a_l;
    a_l[0] = 2;
    a_l[1] = 0x1111;
    a_l[2] = 0x1111;

    printf("clint_to_hex(a_l) = 0x%s\n", clint_to_hex(a_l));

    CLINT b_l;
    b_l[0] = 2;
    b_l[1] = 0xffff;
    b_l[2] = 0xffff;

    printf("clint_to_hex(b_l) = 0x%s\n", clint_to_hex(b_l));

    CLINT c_l;

    printf("code: %d\n", add_l(a_l, b_l, c_l));

    printf("clint_to_hex(c_l) = 0x%s\n", clint_to_hex(c_l));


    return 0;
}
