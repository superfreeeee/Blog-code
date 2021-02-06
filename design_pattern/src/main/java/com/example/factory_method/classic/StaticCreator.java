package com.example.factory_method.classic;

public class StaticCreator {

    public static ProductA createProductA() {
        return new ProductA();
    }

    public static ProductB createProductB() {
        return new ProductB();
    }

    public static Product createProduct(Class<? extends Product> clazz) throws IllegalAccessException, InstantiationException {
        return clazz.newInstance();
    }

    public static Product createProduct(String type) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        return ((Class<? extends Product>) Class.forName(type)).newInstance();
    }
}
