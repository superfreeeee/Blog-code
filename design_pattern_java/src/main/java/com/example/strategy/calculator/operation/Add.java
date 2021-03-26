package com.example.strategy.calculator.operation;

public class Add implements Operation {
    @Override
    public int calculate(int x, int y) {
        return x + y;
    }
}
