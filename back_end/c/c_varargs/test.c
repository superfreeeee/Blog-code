#include <stdio.h>
#include <stdarg.h>
#include <string.h>

// 总和
int sum(int argc, ...) {
    va_list nums;
    va_start(nums, argc);
    int res = va_arg(nums, int);
    for (int i = 1; i < argc; i++) {
        res += va_arg(nums, int);
    }
    return res;
}

// 最大值
int max(int argc, ...) {
    va_list nums;
    va_start(nums, argc);
    int res = va_arg(nums, int);
    for (int i = 1; i < argc; i++) {
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
    for (int i = 1; i < argc; i++) {
        int num = va_arg(nums, int);
        if (num < res) res = num;
    }
    return res;
}

void print(char *format, ...) {
    va_list vars;
    int len = strlen(format);

    va_start(vars, len);
    for (int i=0; i<len; i++) {
        char c = *(format + i);
        switch (c) {
            case 'i':
                printf("param %d is int: %d\n", i, va_arg(vars, int));
                break;
            case 'f':
                printf("param %d is double: %f\n", i, va_arg(vars, double));
                break;
        }
    }
}

int main() {
    printf("sum(1, 2, 3, 4, 5) = %d\n", sum(5, 1, 2, 3, 4, 5));
    printf("max(1, 2, 3, 4, 5) = %d\n", max(5, 1, 2, 3, 4, 5));
    printf("min(1, 2, 3, 4, 5) = %d\n", min(5, 1, 2, 3, 4, 5));
    print("ifif", 2, 3.5, 5, 6.5);
}