package com.example.factory_method.classic;

public abstract class Creator {

    public abstract Product createProduct();

    public void operation() {
        Product product = createProduct();
        System.out.println("using Product " + product);
    }
}
