package com.example.demo.testThread.tasks;

public class ThreadExtension extends Thread {

    private String name;

    public ThreadExtension(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        for(int i=1 ; i<=10 ; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + name + "-" + i);
        }
    }
}
