package com.example.abstract_factory.classic.type2;

import com.example.abstract_factory.classic.Factory;
import com.example.abstract_factory.classic.ProductA;
import com.example.abstract_factory.classic.ProductB;

public class Factory2 implements Factory {
    @Override
    public ProductA createProductA() {
        return new ProductA2();
    }

    @Override
    public ProductB createProductB() {
        return new ProductB2();
    }
}
