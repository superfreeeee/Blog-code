package com.example.algorithm.adt.priorityqueue;

import com.example.algorithm.adt.heap.MaxHeapWithArray;
import com.example.algorithm.adt.heap.MinHeapWithArray;
import org.junit.Test;

import static org.junit.Assert.*;

public class PriorityQueueTest {

    @Test
    public void test_max_priority_with_max_heap_with_array() {
        PriorityQueue<Integer> maxQ = new MaxHeapWithArray<Integer>();
        for(int i=0 ; i < 10 ; i++) {
            maxQ.insert(i, i);
        }
        for(int i=9 ; i >= 0 ; i--) {
            assertEquals(i, (int)maxQ.get());
            assertEquals(i, (int)maxQ.extract());
        }
    }

    @Test
    public void test_min_priority_with_min_heap_with_array() {
        PriorityQueue<Integer> minQ = new MinHeapWithArray<Integer>();
        for(int i=0 ; i < 10 ; i++) {
            minQ.insert(i, i);
        }
        for(int i=0 ; i < 10 ; i++) {
            assertEquals(i, (int)minQ.get());
            assertEquals(i, (int)minQ.extract());
        }
    }
}