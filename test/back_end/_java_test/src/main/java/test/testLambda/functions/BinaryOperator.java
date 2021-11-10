package com.example.demo.testLambda.functions;

@FunctionalInterface
public interface BinaryOperator<T> {
    T exec(T t1, T t2);
}
