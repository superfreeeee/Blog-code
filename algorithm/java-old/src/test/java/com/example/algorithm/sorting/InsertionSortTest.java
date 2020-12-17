package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class InsertionSortTest {

    @Test
    public void test_insertion_sort() {
        assertArrayEquals(SortingSample.b1, InsertionSort.sort(SortingSample.a1));
        assertArrayEquals(SortingSample.b2, InsertionSort.sort(SortingSample.a2));
        assertArrayEquals(SortingSample.b3, InsertionSort.sort(SortingSample.a3));
        assertArrayEquals(SortingSample.b4, InsertionSort.sort(SortingSample.a4));
        assertArrayEquals(SortingSample.b5, InsertionSort.sort(SortingSample.a5));
    }
}