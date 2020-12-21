package com.example.annotation.test1;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        Class<SimpleAnnotationUsage> c = SimpleAnnotationUsage.class;
        // 查看类的注解
        System.out.println("----- Declared annotations from SimpleAnnotationUsage -----");
        for (Annotation annotation : c.getDeclaredAnnotations()) {
            System.out.println(annotation.annotationType().getSimpleName());
        }
        // 查看字段（成员变量）的注解
        System.out.println("----- Declared fields from SimpleAnnotationUsage -----");
        for (Field field : c.getDeclaredFields()) {
            System.out.println("Declared annotations from SimpleAnnotationUsage." + field.getName() + ": " + Arrays.toString(field.getAnnotations()));
        }
        // 查看方法的注解
        System.out.println("----- Declared methods from SimpleAnnotationUsage -----");
        for(Method method : c.getDeclaredMethods()) {
            System.out.println("Declared annotations from SimpleAnnotationUsage." + method.getName() + ": " + Arrays.toString(method.getAnnotations()));
        }
    }
}
