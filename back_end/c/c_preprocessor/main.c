// #include <stdio.h>

// // #define DEBUG
// #ifdef DEBUG
//     #define N 10
// #else
//     #define N 20
// #endif

// int main() {
//     printf("N = %d\n", N);
// }
#include <stdio.h>
#include "const.h"
#include "global.h"

int main() {
    printf("N = %d\n", N);
    N = 100;
    printf("N = %d\n", N);
}