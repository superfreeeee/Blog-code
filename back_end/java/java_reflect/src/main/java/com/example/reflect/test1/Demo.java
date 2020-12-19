package com.example.reflect.test1;

// 建立不同访问权限的各种成员
public class Demo {
    // 成员变量
    private String privateField;
    protected String protectedField;
    String defaultField;
    public String publicField;

    // 构造函数
    private Demo() {}
    protected Demo(int i) {}
    Demo(float f) {}
    public Demo(double d) {}

    // 方法
    private void privateMethod() {}
    protected void protectedMethod() {}
    void defaultMethod() {}
    public void publicMethod() {}

    // 内部类
    private class PrivateInnerClass {}
    protected class ProtectedInnerClass {}
    class DefaultInnerClass {}
    public class PublicInnerClass {}
}
