#include <stdio.h>
#include "hello.h"

#ifdef DEBUG

void hello() {
    printf("Hello World! (Debug mode)\n");
}

#else

void hello() {
    printf("Hello World!\n");
}

#endif