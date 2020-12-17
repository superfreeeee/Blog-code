package com.example.algorithm.adt.heap;

import org.junit.Test;

import static org.junit.Assert.*;

public class HeapTest {

    @Test
    public void test_max_heap() {
        MaxHeap<Integer> heap = new MaxHeapWithArray();
        Integer[] elements = new Integer[10];
        int[] keys = new int[10];
        generateSeqence(elements, keys, new int[]{4, 1, 3, 2, 16, 9, 10, 14, 8, 7});

        heap.build(elements, keys);
        assertEquals(16, (int)heap.maximum());
        assertEquals(16, (int)heap.extractMax());
        assertEquals(14, (int)heap.extractMax());
        assertEquals(10, (int)heap.extractMax());

        heap.insert(20, 20);
        assertEquals(20, (int)heap.maximum());
        heap.insert(30, 30);
        assertEquals(30, (int)heap.maximum());
        heap.insert(40,40);
        assertEquals(40, (int)heap.maximum());
    }

    @Test
    public void test_min_heap() {
        MinHeap<Integer> heap = new MinHeapWithArray();
        Integer[] elements = new Integer[10];
        int[] keys = new int[10];
        generateSeqence(elements, keys, new int[]{-4, -1, -3, -2, -16, -9, -10, -14, -8, -7});

        heap.build(elements, keys);
        assertEquals(-16, (int)heap.minimum());
        assertEquals(-16, (int)heap.extractMin());
        assertEquals(-14, (int)heap.extractMin());
        assertEquals(-10, (int)heap.extractMin());

        heap.insert(-20, -20);
        assertEquals(-20, (int)heap.minimum());
        heap.insert(-30, -30);
        assertEquals(-30, (int)heap.minimum());
        heap.insert(-40, -40);
        assertEquals(-40, (int)heap.minimum());
    }

    private void generateSeqence(Integer[] elements, int[] keys, int[] A) {
        for(int i=0 ; i<A.length ; i++) {
            elements[i] = A[i];
            keys[i] = A[i];
        }
    }
}