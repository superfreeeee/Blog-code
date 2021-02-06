package com.example.factory_method.classic;

import org.junit.Test;

import static org.junit.Assert.*;

public class CreatorTest {

    private void testTemplate(Creator creator) {
        creator.operation();
    }

    @Test
    public void test_creatorA() {
        testTemplate(new CreatorA());
    }

    @Test
    public void test_creatorB() {
        testTemplate(new CreatorB());
    }
}