package com.example.reflect.test4;

public class ConstructorDemo {
    private ConstructorDemo() {}
    protected ConstructorDemo(int i) {
        System.out.println("create ConstructorDemo with i=" + i);
    }
    ConstructorDemo(float f) {}
    public ConstructorDemo(double d) {}
}
