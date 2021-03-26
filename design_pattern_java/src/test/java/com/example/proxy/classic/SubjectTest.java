package com.example.proxy.classic;

import org.junit.Test;

import static org.junit.Assert.*;

public class SubjectTest {

    @Test
    public void test() {
        Subject subject = new SubjectImpl();
        Subject proxy = new SubjectProxy(subject);
        subject.f();
        subject.g();
        proxy.f();
        proxy.g();
    }
}