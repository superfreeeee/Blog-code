package com.example.algorithm.dp;

import org.junit.Test;

import static org.junit.Assert.*;

public class OptimalBSTTest {
    @Test
    public void test() {
        int[] p = new int[]{15, 10, 5, 10, 20};
        int[] q = new int[]{5, 10, 5, 5, 5, 10};
        OptimalBST.solve(p, q);
        String res = OptimalBST.buildRes();
        assertEquals("k2: {k1: {d0, d1}, k5: {k4: {k3: {d2, d3}, d4}, d5}}", res);
    }
}