package com.example.factory_method.classic;

import org.junit.Test;

import static org.junit.Assert.*;

public class StaticCreatorTest {

    @Test
    public void test() throws InstantiationException, IllegalAccessException {
        Product product = StaticCreator.createProduct(ProductA.class);
        System.out.println(product);
        product = StaticCreator.createProduct(ProductB.class);
        System.out.println(product);
    }
}