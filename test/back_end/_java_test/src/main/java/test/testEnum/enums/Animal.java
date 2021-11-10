package com.example.demo.testEnum.enums;

public enum Animal implements IAnimal {
    DOG("dog") {
        public void spark() {
            System.out.println("wang wang");
        }
    },
    CAT("cat") {
        public void spark() {
            System.out.println("miao miao");
        }
    };

    private String type;

    Animal(String type) {
        this.type = type;
    }
}
