package com.example.demo.testThread.tasks;

public class Task implements Runnable {
    private static int count = 0;
    private int id;

    public Task() {
        id = ++count;
    }

    public static void init() {
        count = 0;
    }

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + ":Task-" + id);
    }
}
