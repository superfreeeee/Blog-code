package com.example.demo.testThread.tasks;

public class RunnableImpl implements Runnable {

    private String name;

    public RunnableImpl(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        for(int i=1 ; i<=10 ; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + name + "-" + i);
        }
    }
}
