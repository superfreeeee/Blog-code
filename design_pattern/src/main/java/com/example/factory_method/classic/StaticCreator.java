package com.example.factory_method.classic;

public class StaticCreator {

    public static Product createProduct(Class<? extends Product> clazz) throws IllegalAccessException, InstantiationException {
        return clazz.newInstance();
    }
}
