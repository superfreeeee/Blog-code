package com.example.reflect.test3;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        testMethodInfo();
        invokeMethod();
    }

    private static void testMethodInfo() {
        System.out.println("##### testMethodInfo #####");
        Class<MethodDemo> c = MethodDemo.class;
        System.out.println("----- methods -----");
        for (Method method : c.getMethods()) {
            System.out.println(method.getName());
        }

        System.out.println("----- declared methods -----");
        for (Method method : c.getDeclaredMethods()) {
            System.out.println(method.getName());
        }

        System.out.println("----- declared methods detail -----");
        for (Method method : c.getDeclaredMethods()) {
            System.out.println("name: " + method.getName());
            System.out.println("\treturnType: " + method.getReturnType());
            System.out.println("\tgenericReturnType: " + method.getGenericReturnType());
            System.out.println("\tparameterTypes: " + Arrays.toString(method.getParameterTypes()));
            System.out.println("\tgenericParameterTypes: " + Arrays.toString(method.getGenericParameterTypes()));
            System.out.println("\texceptionTypes: " + Arrays.toString(method.getExceptionTypes()));
            System.out.println("\tgenericExceptionTypes: " + Arrays.toString(method.getGenericExceptionTypes()));
            System.out.println("\tdeclaringClass: " + method.getDeclaringClass());
            System.out.println("\tdefaultValue: " + method.getDefaultValue());
            System.out.println("\tmodifiers: " + method.getModifiers());
        }

        System.out.println();
    }

    private static void invokeMethod() throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        System.out.println("##### invokeMethod #####");
        MethodDemo demo1 = new MethodDemo("demo1");
        MethodDemo demo2 = new MethodDemo("demo2");

        Class<MethodDemo> c = MethodDemo.class;
        Method m = c.getDeclaredMethod("privateMethodWithParams", int.class, int.class);
        m.setAccessible(true); // 方法内部引用私有变量，需要设置 setAccessible(true) 才能正常调用
        m.invoke(demo1, 10, 20);
        m.invoke(demo2, 30, 40);
        System.out.println();
    }
}
