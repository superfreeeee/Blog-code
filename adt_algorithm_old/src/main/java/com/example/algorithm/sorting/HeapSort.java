package com.example.algorithm.sorting;

import com.example.algorithm.adt.heap.MaxHeap;
import com.example.algorithm.adt.heap.MaxHeapWithArray;

/**
 * 堆排序（使用最大堆）
 * 時間複雜度：O(nlgn)
 * 不穩定的
 */
public class HeapSort {

    public static int[] sort(int[] A) {
        MaxHeap<Integer> heap = new MaxHeapWithArray();
        Integer[] elements = new Integer[A.length];
        int[] keys = new int[A.length];
        generateSequence(elements, keys, A);

        heap.build(elements, keys);
        int[] B = new int[A.length];
        for(int i=A.length - 1 ; i >= 0 ; i--) {
            B[i] = heap.extractMax();
        }
        return B;
    }

    private static void generateSequence(Integer[] elements, int[] keys, int[] A) {
        for(int i=0 ; i<A.length ; i++) {
            elements[i] = A[i];
            keys[i] = A[i];
        }
    }
}
