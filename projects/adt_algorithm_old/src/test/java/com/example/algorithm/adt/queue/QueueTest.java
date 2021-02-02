package com.example.algorithm.adt.queue;

import com.example.algorithm.adt.queue.Queue;
import com.example.algorithm.adt.queue.QueueWithArray;
import com.example.algorithm.adt.queue.QueueWithLinkedList;
import org.junit.Test;

import static org.junit.Assert.*;

public class QueueTest {

    Queue<Integer> queue;

    @Test
    public void test_queue_with_array() {
        queue = new QueueWithArray<Integer>();
        test();
        int size = 4;
        queue = new QueueWithArray<Integer>(4);
        test_flow(4);
    }

    @Test
    public void test_queue_with_linkedlist() {
        queue = new QueueWithLinkedList<Integer>();
        test();
    }

    private void test() {
        int[] cmds = new int[]{0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1};
        int[] nums = new int[]{1, 2 ,3, 4, 5, 6, 7};
        int en_top = -1;
        int de_top = -1;
        for(int cmd : cmds) {
            if(cmd == 0) {
                queue.enqueue(nums[++en_top]);
            } else {
                Integer res = queue.dequeue();
                assertEquals(nums[++de_top], (int)res);
            }
        }
    }

    private void test_flow(int size) {
//        test queueWithArray overflow
        for(int i=0 ; i<size ; i++) {
            queue.enqueue(i);
        }
        try {
            queue.enqueue(0);
        } catch (IndexOutOfBoundsException e) {
            assertEquals("queue overflow", e.getMessage());
        }
//        test queueWithArray underflow
        for(int i=0 ; i<size ; i++) {
            queue.dequeue();
        }
        try {
            queue.dequeue();
        } catch (IndexOutOfBoundsException e) {
            assertEquals("queue underflow", e.getMessage());
        }
        assertEquals(true, queue.isEmpty());
    }
}