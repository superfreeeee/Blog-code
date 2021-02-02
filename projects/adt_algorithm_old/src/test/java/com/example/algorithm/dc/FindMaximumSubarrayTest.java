package com.example.algorithm.dc;

import org.junit.Test;

import static org.junit.Assert.*;

public class FindMaximumSubarrayTest {
    @Test
    public void test1() {
        int[] a = new int[]{13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7};
        int[] res = new int[]{7, 10, 43};
        assertArrayEquals(res, FindMaximumSubarray.find(a));
    }
}