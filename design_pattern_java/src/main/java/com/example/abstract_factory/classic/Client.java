package com.example.abstract_factory.classic;

public class Client {
    void buildSomething(Factory factory) {
        ProductA productA = factory.createProductA();
        ProductB productB = factory.createProductB();
        System.out.println("Factory: " + factory);
        System.out.println("ProductA: " + productA);
        System.out.println("ProductB: " + productB);
    }
}
