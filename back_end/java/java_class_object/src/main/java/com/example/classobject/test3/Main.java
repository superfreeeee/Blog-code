package com.example.classobject.test3;

public class Main {

    public static void main(String[] args) {
        try {
            Class<SubClass> c = SubClass.class;
            SubClass subClass = c.newInstance();
            System.out.println("after create subClass");
            Class<? super SubClass> pc = c.getSuperclass();
            // pc.newInstance return type "capture of ? super SubClass"
            Object superClass = pc.newInstance();
            System.out.println("after create superClass");
        } catch (IllegalAccessException e) {
            System.out.println("Illegal access");
            System.exit(1);
        } catch (InstantiationException e) {
            System.out.println("Instantiation error");
            System.exit(1);
        }
    }
}
