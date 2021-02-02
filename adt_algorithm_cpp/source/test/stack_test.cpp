//
// Created by 超悠閒 on 2020/10/31.
//
#include "stack_test.h"
#include "stack.h"
#include "myassert.h"

using namespace std;

void test_stack_with_array() {
    Stack<int> stack;
    int nums[] = {0, 4, 1, 5, 2, 6, 3, 0, 4, 7};
    for (int i = 0; i < 10; i++) stack.push(nums[i]);
    for (int i = 9; i >= 4; i--) {
        assertEquals(nums[i], stack.pop());
    }
    assertEquals(5, stack.top());
    cout << "test stack with array success" << endl;
}