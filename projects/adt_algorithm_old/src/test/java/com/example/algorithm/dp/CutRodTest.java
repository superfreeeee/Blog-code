package com.example.algorithm.dp;

import org.junit.Test;

import static org.junit.Assert.*;

public class CutRodTest {
    @Test
    public void test() {
        int n = 10;
        int[] p = new int[]{1, 5, 8, 9, 10, 17, 17, 20, 24, 30};
        int res = CutRod.bottomUpSolution(p, n);
        CutRod.printSolution(n);
        assertEquals(30, res);

        for(int i = 10 ; i > 0 ; i--) {
            CutRod.buildSolution(i);
            System.out.println();
        }

    }
}