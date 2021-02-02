package com.example.strategy.calculator.operation;

/**
 * 运算符策略
 */

@FunctionalInterface
public interface Operation {

    /**
     * 运算
     *
     * @param x
     * @param y
     * @return
     */
    int calculate(int x, int y);
}
