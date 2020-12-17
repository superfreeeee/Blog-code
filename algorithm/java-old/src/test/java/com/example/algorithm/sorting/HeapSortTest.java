package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class HeapSortTest {

    @Test
    public void test_heap_sort() {
        assertArrayEquals(SortingSample.b1, HeapSort.sort(SortingSample.a1));
        assertArrayEquals(SortingSample.b2, HeapSort.sort(SortingSample.a2));
        assertArrayEquals(SortingSample.b3, HeapSort.sort(SortingSample.a3));
        assertArrayEquals(SortingSample.b4, HeapSort.sort(SortingSample.a4));
        assertArrayEquals(SortingSample.b5, HeapSort.sort(SortingSample.a5));
    }
}