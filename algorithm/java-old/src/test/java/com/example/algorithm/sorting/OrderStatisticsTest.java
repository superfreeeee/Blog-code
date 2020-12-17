package com.example.algorithm.sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class OrderStatisticsTest {

    private int[] nums1 = new int[]{};
    private int[] nums2 = new int[]{2,6,3,4,7};
    private int[] nums3 = new int[]{6,5,4,3,2,1,0};
    private int[] nums4 = new int[]{-10,9,-8,7,-6,5,-4,3,-2,1};

    @Test
    public void test_minimum() {
        assertEquals(Integer.MAX_VALUE, OrderStatistics.minimum(nums1));
        assertEquals(2, OrderStatistics.minimum(nums2));
        assertEquals(0, OrderStatistics.minimum(nums3));
        assertEquals(-10, OrderStatistics.minimum(nums4));
    }

    @Test
    public void test_maximum() {
        assertEquals(Integer.MIN_VALUE, OrderStatistics.maximum(nums1));
        assertEquals(7, OrderStatistics.maximum(nums2));
        assertEquals(6, OrderStatistics.maximum(nums3));
        assertEquals(9, OrderStatistics.maximum(nums4));
    }
}