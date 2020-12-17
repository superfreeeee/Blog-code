//
// Created by 超悠閒 on 2020/10/30.
//
#include <iostream>

#include "utils.h"

using namespace std;

void print(int *nums, int len) {
    if (nums == NULL) {
        cout << "[empty]";
        return;
    }
    cout << "[";
    for (int i = 0; i < len; i++) {
        if (i > 0) cout << ", ";
        cout << nums[i];
    }
    cout << "]";
}

void println(int *nums, int len) {
    print(nums, len);
    cout << endl;
}

int *range(int end, int *len) {
    *len = end;
    int *nums = new int[end]();
    for (int i = 0; i < end; i++) {
        nums[i] = i;
    }
    return nums;
}

int *range(int start, int end, int *len) {
    *len = end - start;
    int *nums = new int[*len]();
    for (int i = 0; i < *len; i++) {
        nums[i] = start + i;
    }
    return nums;
}

void free(int *nums, int len) {
    delete[] nums;
    nums = NULL;
    print(nums, len);
}

