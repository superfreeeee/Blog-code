package org.example.os.utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class Transformer32Test {

    @Test
    public void test_decimalToBinary() {
        int[] vals = new int[]{0, 1, 128, 1023};
        String[] results = new String[]{
                "00000000000000000000000000000000",
                "00000000000000000000000000000001",
                "00000000000000000000000010000000",
                "00000000000000000000001111111111"
        };
        for(int i=0 ; i<vals.length ; i++) {
            assertEquals(results[i], Transformer32.decimalToBinary(vals[i]));
        }
    }

    @Test
    public void test_binaryToDecimal() {
        int[] vals = new int[]{0, 1, 128, 1023};
        String[] results = new String[]{
                "00000000000000000000000000000000",
                "00000000000000000000000000000001",
                "00000000000000000000000010000000",
                "00000000000000000000001111111111"
        };
        for(int i=0 ; i<vals.length ; i++) {
            assertEquals(vals[i], Transformer32.binaryToDecimal(results[i]));
        }
    }
}