package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class BucketSortTest {

    @Test
    public void test_bucket_sort() {
        double delta = 0.0001;
        assertArrayEquals(SortingSample.b8, BucketSort.sort(SortingSample.a8),delta);
    }
}