package com.example.algorithm.dp;

import org.junit.Test;

import static org.junit.Assert.*;

public class LongestCommonSubsequenceTest {
    @Test
    public void test() {
        String x = "ABCBDAB",
                y = "BDCABA",
                z = "BCBA";
        String res = LongestCommonSubsequence.buildLCS(x, y);
        assertEquals(z, res);
    }
}