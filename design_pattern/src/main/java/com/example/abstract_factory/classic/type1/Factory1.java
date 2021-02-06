package com.example.abstract_factory.classic.type1;

import com.example.abstract_factory.classic.Factory;
import com.example.abstract_factory.classic.ProductA;
import com.example.abstract_factory.classic.ProductB;

public class Factory1 implements Factory {
    @Override
    public ProductA createProductA() {
        return new ProductA1();
    }

    @Override
    public ProductB createProductB() {
        return new ProductB1();
    }
}
