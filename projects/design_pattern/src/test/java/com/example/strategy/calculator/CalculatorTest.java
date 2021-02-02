package com.example.strategy.calculator;

import com.example.strategy.calculator.operation.Operation;
import org.junit.Test;

import static org.junit.Assert.*;

public class CalculatorTest {

    private Calculator calculator = new Calculator();

    @Test
    public void test_basic() {
        String[] cmds = new String[]{
                "add 200 70",
                "sub 200 70",
                "mul 200 70",
                "div 200 70",
        };
        int[] results = new int[]{
                270,
                130,
                14000,
                2
        };

        for (int i = 0; i < cmds.length; i++) {
            int res = calculator.calculate(cmds[i]);
            assertEquals(results[i], res);
        }
    }

    @Test
    public void test_gcd() {
        Operation gcd = (x, y) -> {
            if (x < 0 || y < 0) return 0;
            if (x < y) {
                x = x ^ y; // x = x0 ^ y0
                y = x ^ y; // y = x0
                x = x ^ y; // x = y0
            }
            while (y > 0) {
                int tmp = y;
                y = x % y;
                x = tmp;
            }
            return x;
        };
        calculator.custom("gcd", gcd);
        String cmd = "gcd 200 70";
        int ans = 10;
        assertEquals(ans, calculator.calculate(cmd));
    }
}