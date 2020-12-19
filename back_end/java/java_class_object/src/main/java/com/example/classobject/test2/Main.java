package com.example.classobject.test2;

public class Main {

    private static void printInheritList(Class c) {
        Class pc;
        // 递归检索父类，直到 null（Object.class.getSuperclass() 为 null）
        while ((pc = c.getSuperclass()) != null) {
            System.out.println(c.getName() + " extends " + pc.getName());
            c = pc;
        }
    }

    public static void main(String[] args) {
        try {
            Class c = Class.forName("com.example.classobject.test2.C");
            printInheritList(c);
        } catch (ClassNotFoundException e) {
            System.out.println("Class C not found");
            System.exit(1);
        }
    }
}
