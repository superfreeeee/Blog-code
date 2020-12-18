package com.example.classobject.test1;

public class Main {

    private static void info(Class c) {
        System.out.println("----- info -----");
        System.out.println("Class name: " + c.getName());
        System.out.println("is interface: " + c.isInterface());
        System.out.println("Simple name: " + c.getSimpleName());
        System.out.println("Canonical name: " + c.getCanonicalName());
    }

    public static void main(String[] args) {
        Class c = null;
        try {
            c = Class.forName("com.example.classobject.test1.B");
        } catch (ClassNotFoundException e) {
            System.out.println("B not found");
            System.exit(1);
        }

        info(c);
        for(Class i : c.getInterfaces()) {
            info(i);
        }

        Class pc = c.getSuperclass();
        Object p = null;

        try {
            p = pc.newInstance();
        } catch (InstantiationException e) {
            System.out.println("unable to instantiate");
            System.exit(1);
        } catch(IllegalAccessException e) {
            System.out.println("unable to access");
            System.exit(1);
        }
        info(p.getClass());
    }
}
