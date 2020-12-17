package com.example.algorithm.ga;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class ActivitySelectorTest {

    private static int[] s1 = new int[]{1, 3, 0, 5, 3, 5, 6, 8, 8, 2, 12};
    private static int[] f1 = new int[]{4, 5, 6, 7, 9, 9, 10, 11, 12, 14, 16};
    private static int[] a1 = new int[]{1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1};

    @Test
    public void test_recursive_1() {
        int[] res = ActivitySelector.solveRecursive(s1, f1);
        System.out.println("s: " + Arrays.toString(s1));
        System.out.println("f: " + Arrays.toString(f1));
        System.out.println("A: " + Arrays.toString(res));
        assertArrayEquals(a1, res);
    }

    @Test
    public void test_greedy_1() {
        int[] res = ActivitySelector.solveGreedy(s1, f1);
        System.out.println("s: " + Arrays.toString(s1));
        System.out.println("f: " + Arrays.toString(f1));
        System.out.println("A: " + Arrays.toString(res));
        assertArrayEquals(a1, res);
    }
}