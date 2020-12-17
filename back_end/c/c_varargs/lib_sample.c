#include <stdio.h>
#include <stdarg.h>

void print_ints(int argc, ...) {
    va_list ints;
    va_start(ints, argc);
    for (int i=0 ; i<argc ; i++) {
        printf("ints[%d]: %d\n", i, va_arg(ints, int));
    }
}

int main() {
    print_ints(3, 1, 2, 3);
}