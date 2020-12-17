package com.example.demo.testLambda.functions;

@FunctionalInterface
public interface ITest1 {
    void run();
    boolean equals(Object object);
    default void run2() {
        System.out.println(123);
    }
}
