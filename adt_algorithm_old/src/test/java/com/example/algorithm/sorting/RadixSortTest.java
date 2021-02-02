package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class RadixSortTest {

    @Test
    public void test_radix_sort() {
        int base = 10;
        assertArrayEquals(SortingSample.b7, RadixSort.sort(SortingSample.a7, base));
    }
}