package com.example.reflect.test3;

public class MethodDemo {

    private String name;

    public MethodDemo(String name) {
        this.name = name;
    }

    private void privateMethod() {}
    protected void protectedMethod() {}
    void defaultMethod() {}
    public void publicMethod() {}
    public static void publicStaticMethod() {}
    private void privateMethodWithParams(int i, int j) {
        System.out.println("invoke privateMethodWithParams from object: [name=" + name + "], with params: [i=" + i + ", j=" + j + "]");
    }
    void defaultMethodWithExceptions() throws NoSuchMethodException, IllegalArgumentException {}
}
