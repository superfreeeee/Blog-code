package com.example.demo.testThread;

import com.example.demo.testThread.tasks.CallableTask;
import com.example.demo.testThread.tasks.RunnableImpl;
import com.example.demo.testThread.tasks.Task;
import com.example.demo.testThread.tasks.ThreadExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class TestThread {
    public static void main(String[] args) throws Exception {

//        for(int i=1 ; i<=5; i++) {
//            new ThreadExtension("test" + i).start();
//        }

//        Runnable task = () -> {
//            for(int i=0 ; i<5 ; i++) {
//                System.out.println(Thread.currentThread().getName() + ":" + i);
//            }
//        };
//        for(int i=1 ; i<=5 ; i++) {
//            new Thread(new RunnableImpl("test"+i)).start();
//        }

        //        new ThreadPoolExecutor(3, 10, 2000, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());

//        System.out.println("----- newFixedThreadPool -----");
//        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
//        for(int i=0 ; i<10 ; i++) {
//            fixedThreadPool.execute(new Task());
//        }
//        fixedThreadPool.shutdown();

//        Task.init();

//        System.out.println("\n----- newCachedThreadPool -----");
//        ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
//        for(int i=0 ; i<10; i++) {
//            cachedThreadPool.execute(new Task());
//        }
//        cachedThreadPool.shutdown();
//
//        Task.init();

//        System.out.println("\n----- newSingleThreadExecutor -----");
//        ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
//        for(int i=0 ; i<10; i++) {
//            singleThreadExecutor.execute(new Task());
//        }
//        singleThreadExecutor.shutdown();

//        System.out.println("\n----- newScheduledThreadPool -----");
//        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(3);
//        for(int i=0 ; i<10; i++) {
//            scheduledExecutorService.schedule(new Task(), 1000 - i * 100, TimeUnit.MILLISECONDS);
//        }
//        scheduledExecutorService.scheduleAtFixedRate(new Task(), 1000, 1000, TimeUnit.MILLISECONDS);
//        scheduledExecutorService.scheduleWithFixedDelay(new Task(), 1200, 1000, TimeUnit.MILLISECONDS);
//        scheduledExecutorService.shutdown();

        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);
        Runnable task = new Runnable() {
            private String name = "task-test";
            private int count = 0;
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + ":" + name + ":" + count++);
            }
        };
        List<Callable<String>> tasks = new ArrayList<>();
        for(int i=0 ; i<5 ; i++) {
            tasks.add(new CallableTask());
        }

        // execute
        fixedThreadPool.execute(task);

        // submit
        Future<String> future = fixedThreadPool.submit(task, "submit over");
        System.out.println(future.get());

        // invokeAny
        String result = fixedThreadPool.invokeAny(tasks);
        System.out.println(result);

        // invokeAll
        List<Future<String>> results = fixedThreadPool.invokeAll(tasks);
        for(Future<String> res : results) {
            System.out.println(res.get());
        }

        fixedThreadPool.shutdown();
        if(!fixedThreadPool.awaitTermination(1000, TimeUnit.MILLISECONDS)) {
            System.out.println("shutdownNow");
            List<Runnable> incompleteTasks = fixedThreadPool.shutdownNow();
        } else {
            System.out.println("shutdownNormal");
        }
    }
}
