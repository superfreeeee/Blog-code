package com.example.factory_method.classic;

public class CreatorA extends Creator {
    @Override
    public Product createProduct() {
        return new ProductA();
    }
}
