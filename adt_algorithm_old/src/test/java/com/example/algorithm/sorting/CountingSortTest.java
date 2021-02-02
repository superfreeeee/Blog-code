package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class CountingSortTest {

    @Test
    public void test_counting_sort() {
        int k = 10;
        assertArrayEquals(SortingSample.b6, CountingSort.sort(SortingSample.a6, k));
    }
}