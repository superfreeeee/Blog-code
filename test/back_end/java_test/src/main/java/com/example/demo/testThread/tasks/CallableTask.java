package com.example.demo.testThread.tasks;

import java.util.concurrent.Callable;

public class CallableTask implements Callable<String> {
    private static int count = 0;
    private int id;

    public CallableTask() {
        this.id = ++count;
    }

    @Override
    public String call() throws Exception {
        System.out.println(Thread.currentThread().getName() + ":callable-" + id);
        return "callable-" + id + " over";
    }
}
