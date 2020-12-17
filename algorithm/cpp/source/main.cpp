#include <iostream>
#include "sorting.h"
#include "utils.h"
#include "stack_test.h"
#include "queue_test.h"

using namespace std;

int main() {
    try {
//        test_stack_with_array();
        test_queue_circular();
    } catch (const char *msg) {}
}
