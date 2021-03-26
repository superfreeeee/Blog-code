package com.example.factory_method.classic;

public class ProductC {

    private ProductC() {
    }

    public static ProductC create() {
        return new ProductC();
    }
}
