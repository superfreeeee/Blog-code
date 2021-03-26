package com.example.strategy.calculator.operation;

public class Mul implements Operation {
    @Override
    public int calculate(int x, int y) {
        return x * y;
    }
}
