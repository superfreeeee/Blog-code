package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class MergeSortTest {

    @Test
    public void test_merge_sort() {
        assertArrayEquals(SortingSample.b1, MergeSort.sort(SortingSample.a1));
        assertArrayEquals(SortingSample.b2, MergeSort.sort(SortingSample.a2));
        assertArrayEquals(SortingSample.b3, MergeSort.sort(SortingSample.a3));
        assertArrayEquals(SortingSample.b4, MergeSort.sort(SortingSample.a4));
        assertArrayEquals(SortingSample.b5, MergeSort.sort(SortingSample.a5));
    }
}