package com.example.demo.testLambda.functions;

@FunctionalInterface
public interface UnaryOperator<T> {
    T exec(T t);
}
