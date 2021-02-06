package com.example.abstract_factory.classic;

import com.example.abstract_factory.classic.type1.Factory1;
import com.example.abstract_factory.classic.type2.Factory2;
import org.junit.Test;

public class ClientTest {

    private Client client = new Client();

    @Test
    public void test_factory1() {
        client.buildSomething(new Factory1());
    }

    @Test
    public void test_factory2() {
        client.buildSomething(new Factory2());
    }
}