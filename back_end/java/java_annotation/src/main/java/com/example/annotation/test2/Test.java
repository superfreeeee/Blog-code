package com.example.annotation.test2;

import java.lang.reflect.Method;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        Class<DemoController> c = DemoController.class;
        System.out.println("DemoController's annotations: " + Arrays.toString(c.getDeclaredAnnotations()));
        for (Method method : c.getDeclaredMethods()) {
            System.out.println("method: name=" + method.getName() + ", with annotations: " + Arrays.toString(method.getDeclaredAnnotations()));
            RequestMapping requestMapping = method.getAnnotation(RequestMapping.class);
            System.out.println("\tname: " + requestMapping.name());
            System.out.println("\tpath: " + requestMapping.path());
            System.out.println("\tparamsType: " + Arrays.toString(requestMapping.params()));
        }
    }
}
