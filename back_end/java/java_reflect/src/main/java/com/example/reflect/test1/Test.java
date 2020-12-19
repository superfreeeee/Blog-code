package com.example.reflect.test1;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        Class<Demo> demoClass = Demo.class;

        // 查询成员变量
        System.out.println("----- Demo fields ----- ");
        for(Field field : demoClass.getFields()) {
            System.out.println("field: " + field.getName() + ", type: " + field.getType().getName());
        }
        System.out.println("----- Demo declared fields ----- ");
        for(Field field : demoClass.getDeclaredFields()) {
            System.out.println("field: " + field.getName() + ", type: " + field.getType().getName());
        }
        // 查询方法
        System.out.println("----- Demo methods ----- ");
        for(Method method : demoClass.getMethods()) {
            System.out.println("method: " + method.getName() + ", params: " + Arrays.toString(method.getParameterTypes()));
        }
        System.out.println("----- Demo declared methods ----- ");
        for(Method method : demoClass.getDeclaredMethods()) {
            System.out.println("method: " + method.getName() + ", params: " + Arrays.toString(method.getParameterTypes()));
        }
        // 查询构造函数
        System.out.println("----- Demo constructors ----- ");
        for(Constructor constructor : demoClass.getConstructors()) {
            System.out.println("constructor: " + constructor.getName() + ", params: " + Arrays.toString(constructor.getParameterTypes()));
        }
        System.out.println("----- Demo declared constructors ----- ");
        for(Constructor constructor : demoClass.getDeclaredConstructors()) {
            System.out.println("constructor: " + constructor.getName() + ", params: " + Arrays.toString(constructor.getParameterTypes()));
        }
        // 查询内部类
        System.out.println("----- Demo classes ----- ");
        for(Class c : demoClass.getClasses()) {
            System.out.println("class: " + c.getName() + ", modifiers: " + c.getModifiers());
        }
        System.out.println("----- Demo declared classes ----- ");
        for(Class c : demoClass.getDeclaredClasses()) {
            System.out.println("class: " + c.getName() + ", modifiers: " + c.getModifiers());
        }
    }
}
