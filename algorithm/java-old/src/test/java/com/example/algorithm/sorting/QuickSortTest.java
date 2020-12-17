package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class QuickSortTest {

    @Test
    public void test_quick_sort() {
        assertArrayEquals(SortingSample.b1, QuickSort.sort(SortingSample.a1, false));
        assertArrayEquals(SortingSample.b2, QuickSort.sort(SortingSample.a2, false));
        assertArrayEquals(SortingSample.b3, QuickSort.sort(SortingSample.a3, false));
        assertArrayEquals(SortingSample.b4, QuickSort.sort(SortingSample.a4, false));
        assertArrayEquals(SortingSample.b5, QuickSort.sort(SortingSample.a5, false));
    }

    @Test
    public void test_randomized_quick_sort() {
        assertArrayEquals(SortingSample.b1, QuickSort.sort(SortingSample.a1, true));
        assertArrayEquals(SortingSample.b2, QuickSort.sort(SortingSample.a2, true));
        assertArrayEquals(SortingSample.b3, QuickSort.sort(SortingSample.a3, true));
        assertArrayEquals(SortingSample.b4, QuickSort.sort(SortingSample.a4, true));
        assertArrayEquals(SortingSample.b5, QuickSort.sort(SortingSample.a5, true));
    }

}