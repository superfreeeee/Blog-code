package com.example.strategy.calculator.operation;

public class Mod implements Operation {
    @Override
    public int calculate(int x, int y) {
        return x % y;
    }
}
