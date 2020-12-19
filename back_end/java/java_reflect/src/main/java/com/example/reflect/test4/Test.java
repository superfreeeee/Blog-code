package com.example.reflect.test4;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) throws NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {
        testConstructorInfo();
        invokeConstructor();
    }

    private static void testConstructorInfo() {
        System.out.println("##### testConstructorInfo #####");
        Class<ConstructorDemo> c = ConstructorDemo.class;
        System.out.println("----- constructors -----");
        for (Constructor constructor : c.getConstructors()) {
            System.out.println(constructor.getName() + ", params: " + Arrays.toString(constructor.getParameterTypes()));
        }

        System.out.println("----- declared constructors -----");
        for (Constructor constructor : c.getDeclaredConstructors()) {
            System.out.println(constructor.getName() + ", params: " + Arrays.toString(constructor.getParameterTypes()));
        }

        System.out.println("----- declared constructors detail -----");
        for (Constructor constructor : c.getDeclaredConstructors()) {
            System.out.println("name: " + constructor.getName());
            System.out.println("\tparameterTypes: " + Arrays.toString(constructor.getParameterTypes()));
            System.out.println("\tgenericParameterTypes: " + Arrays.toString(constructor.getGenericParameterTypes()));
            System.out.println("\tmodifiers: " + constructor.getModifiers());
        }

        System.out.println();
    }

    private static void invokeConstructor() throws NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {
        System.out.println("##### invokeConstructor #####");

        Class<ConstructorDemo> c = ConstructorDemo.class;
        Constructor constructor = c.getDeclaredConstructor(int.class);
        ConstructorDemo demo1 = c.cast(constructor.newInstance(1));
        ConstructorDemo demo2 = c.cast(constructor.newInstance(2));

        System.out.println();
    }
}
