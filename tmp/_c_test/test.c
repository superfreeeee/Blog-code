#include <stdio.h>
#include <stdarg.h>

// 总和
int sum(int argc, ...) {
    va_list nums;
    va_start(nums, argc);
    int res = va_arg(nums, int);
    for (int i=1 ; i<argc ; i++) {
        res += va_arg(nums, int);
    }
    return res;
}

// 最大值
int max(int argc, ...) {
    va_list nums;
    va_start(nums, argc);
    int res = va_arg(nums, int);
    for (int i=1 ; i<argc ; i++) {
        int num = va_arg(nums, int);
        if (num > res) res = num;
    }
    return res;
}

// 最小值
int min(int argc, ...) {
    va_list nums;
    va_start(nums, argc);
    int res = va_arg(nums, int);
    for (int i=1 ; i<argc ; i++) {
        int num = va_arg(nums, int);
        if (num < res) res = num;
    }
    return res;
}

int main() {
    printf("sum(1, 2, 3, 4, 5) = %d\n", sum(5, 1, 2, 3, 4, 5));
    printf("max(1, 2, 3, 4, 5) = %d\n", max(5, 1, 2, 3, 4, 5));
    printf("min(1, 2, 3, 4, 5) = %d\n", min(5, 1, 2, 3, 4, 5));
}