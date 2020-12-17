package adt.queue;

import org.junit.Test;

import static org.junit.Assert.*;

public class QueueTest {
    @Test
    public void test_queue_circular() {
        Queue<Integer> queue = new QueueCircular<Integer>();
        queue.info();
        System.out.println("enqueue 11 numbers: ");
        // 入队 11 个数
        for (int i = 1; i < 22; i += 2) {
            queue.enqueue(i);
            queue.info();
        }
        System.out.println("\ndequeue 11 numbers: ");
        // 出队 11 个数，检查是否符合 FIFO 顺序
        for (int i = 1; i < 20; i += 2) {
            assertEquals((Integer) i, queue.dequeue());
            queue.info();
        }
        System.out.println("\ncheck front & rear: ");
        // 查看指针问题
        for (int i = 0; i < 10; i++) {
            queue.enqueue(i);
            System.out.print("enqueue: ");
            queue.info();
            assertEquals((Integer) i, queue.dequeue());
            System.out.print("dequeue: ");
            queue.info();
            System.out.println();
        }
        for (int i = 1; i < 20; i += 2) queue.enqueue(i);
        // 查看临界条件下的出入栈
        System.out.println("check front & rear 2: ");
        for (int i = 1; i < 20; i += 2) {
            assertEquals((Integer) i, queue.dequeue());
            System.out.print("dequeue: ");
            queue.info();
            queue.enqueue(i);
            System.out.print("enqueue: ");
            queue.info();
            System.out.println();
        }
    }
}