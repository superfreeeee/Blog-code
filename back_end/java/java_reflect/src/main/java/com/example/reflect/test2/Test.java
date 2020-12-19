package com.example.reflect.test2;

import java.lang.reflect.Field;

public class Test {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
        testFieldInfo();
        extractFieldInfo();
    }

    private static void testFieldInfo() {
        System.out.println("##### testFieldInfo #####");
        Class<FieldDemo> fieldDemoClass = FieldDemo.class;

        // getFields
        System.out.println("----- fields ----- ");
        for (Field field : fieldDemoClass.getFields()) {
            System.out.println(field.getName());
        }
        // getDeclaredFields
        System.out.println("----- declared fields ----- ");
        for(Field field : fieldDemoClass.getDeclaredFields()) {
            System.out.println(field.getName());
        }
        // fields detail
        System.out.println("----- declared fields detail ----- ");
        for(Field field : fieldDemoClass.getDeclaredFields()) {
            System.out.println("name: " + field.getName());
            System.out.println("\ttype: " + field.getType());
            System.out.println("\tgenericType: " + field.getGenericType());
            System.out.println("\tdeclaringClass: " + field.getDeclaringClass());
            System.out.println("\tmodifiers: " + field.getModifiers());
        }
        System.out.println();
    }

    private static void extractFieldInfo() throws NoSuchFieldException, IllegalAccessException {
        System.out.println("##### extractFieldInfo #####");
        FieldDemo demo1 = new FieldDemo();
        demo1.publicInt = 1;
        FieldDemo demo2 = new FieldDemo();
        demo2.publicInt = 2;

        Class<FieldDemo> fieldDemoClass = FieldDemo.class;
        Field publicInt = fieldDemoClass.getDeclaredField("publicInt"); // throws NoSuchFieldException
        System.out.println("demo1.publicInt: " + publicInt.getInt(demo1));
        System.out.println("demo2.publicInt: " + publicInt.getInt(demo2));
        System.out.println();
    }
}
