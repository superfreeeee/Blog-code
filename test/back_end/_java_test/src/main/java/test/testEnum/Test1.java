package com.example.demo.testEnum;

import com.example.demo.testEnum.enums.*;

public class Test1 {

    public static void main(String[] args) {
//        testColor();
//        testCustomerException();
//        testAnimal();
        testSingleton();
    }

    private static void testSingleton() {
        Singleton s1 = Singleton.INSTANCE;
        s1.doSomthing();
        Singleton s2 = Singleton.valueOf("INSTANCE");
        s2.doSomthing();
        System.out.println("s1 == s2 ? " + (s1 == s2));
    }

    private static void testAnimal() {
        Animal dog = Animal.DOG;
        dog.spark();
        Animal cat = Animal.CAT;
        cat.spark();
    }

    private static void testColor() {
//        Color blue = Color.BLUE;
//        Color red = Color.RED;
//        Color green = Color.GREEN;
//        System.out.println(blue);
//        System.out.println(red);
//        System.out.println(green);
//        System.out.println(blue.toString());
//        System.out.println(blue.ordinal());

//        Color[] colors = Color.values();
//        for(Color color : colors) {
//            System.out.println(color);
//        }
        Color blue = Color.valueOf("blue".toUpperCase());
        System.out.println(blue);
    }

    private static void testCustomerException() {
        CustomerException controllerException = CustomerException.ControllerException;
        System.out.println(controllerException);
        CustomerException serviceException = CustomerException.ServiceException;
        System.out.println(serviceException.getCode());
    }

}

