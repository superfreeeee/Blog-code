package com.example.factory_method.classic;

public class CreatorB extends Creator {
    @Override
    public Product createProduct() {
        return new ProductB();
    }
}
