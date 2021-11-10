package com.example.demo.testEnum.enums;

public enum Singleton {
    INSTANCE;

    private int id;

    Singleton() {
        this.id = 0;
    }

    public void doSomthing() {
        System.out.println("do something with same instance: id = " + id);
    }

}
