//
// Created by 超悠閒 on 2020/10/31.
//
#include "queue_test.h"
#include "queue.h"
#include "myassert.h"

using namespace std;

void test_queue_circular() {

    Queue<int> Q;
    Q.info();

    cout << "enqueue 11 numbers: " << endl;
    for (int i = 1; i < 22; i += 2) {
        Q.enqueue(i);
        Q.info();
    }

    cout << endl << "dequeue 11 numbers: " << endl;
    // 出队 11 个数，检查是否符合 FIFO 顺序
    for (int i = 1; i < 20; i += 2) {
        assertEquals(i, Q.dequeue());
        Q.info();
    }

    cout << endl << "check front & rear: " << endl;
    // 查看指针问题
    for (int i = 0; i < 10; i++) {
        Q.enqueue(i);
        cout << "enqueue: ";
        Q.info();
        assertEquals(i, Q.dequeue());
        cout << "dequeue: ";
        Q.info();
        cout << endl;
    }

    for (int i = 1; i < 20; i += 2) Q.enqueue(i);
    // 查看临界条件下的出入栈
    cout << "check front & rear 2: " << endl;
    for (int i = 1; i < 20; i += 2) {
        assertEquals(i, Q.dequeue());
        cout << "dequeue: ";
        Q.info();
        cout << endl;
        Q.enqueue(i);
        cout << "enqueue: ";
        Q.info();
    }

    cout << "test queue circular success" << endl;
}