package com.example.algorithm.dp;

import org.junit.Test;

import static org.junit.Assert.*;

public class MatrixChainMultiplicationTest {

    @Test
    public void test() {
        int[] p = new int[]{30, 35, 15, 5, 10, 20, 25};
        MatrixChainMultiplication.optimalOrder(p);

        String res = MatrixChainMultiplication.printOrder();
        assertEquals("((1(23))((45)6))", res);
    }
}