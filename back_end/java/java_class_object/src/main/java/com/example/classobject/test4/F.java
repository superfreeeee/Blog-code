package com.example.classobject.test4;

public abstract class F {
    public static F createAnonymous() {
        // 匿名类型
        return new F() {
        };
    }

    public static F createLocal() {
        // 局部类型
        class G extends F {}
        return new G();
    }
}
