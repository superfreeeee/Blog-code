package com.example.factory_method.classic;

import org.junit.Test;

import static org.junit.Assert.*;

public class StaticCreatorTest {

    @Test
    public void test() throws InstantiationException, IllegalAccessException, ClassNotFoundException {
        Product product = StaticCreator.createProductA();
        System.out.println(product);
        product = StaticCreator.createProductB();
        System.out.println(product);
        product = StaticCreator.createProduct(ProductA.class);
        System.out.println(product);
        product = StaticCreator.createProduct("com.example.factory_method.classic.ProductB");
        System.out.println(product);
    }
}