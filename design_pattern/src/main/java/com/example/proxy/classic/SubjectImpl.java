package com.example.proxy.classic;

public class SubjectImpl implements Subject {
    @Override
    public void f() {
        System.out.println("invoke function f");
    }

    @Override
    public void g() {
        System.out.println("invoke function g");
    }
}
