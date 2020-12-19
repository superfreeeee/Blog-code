package com.example.classobject.test1;

public class Test {
    public static void main(String[] args) {
        Class c = Test.class;
        System.out.println("Test.class: " + c);
        Test t1 = new Test();
        Test t2 = new Test();
        Test t3 = new Test();
        System.out.println(c == t1.getClass());
        System.out.println(c == t2.getClass());
        System.out.println(c == t3.getClass());
    }
}
