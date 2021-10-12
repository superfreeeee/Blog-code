package com.example.demo.testLambda;

import com.example.demo.testLambda.functions.BinaryOperator;
import com.example.demo.testLambda.functions.UnaryOperator;

import java.util.*;
import java.util.concurrent.Callable;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class TestLambda {
    public static void main(String[] args) {
//        Supplier
//        Predicate
//        Callable

//        Integer[] numArray = new Integer[]{3,2,4,1,5,5,1,4,2,3};
//        List<Integer> nums = new ArrayList<>();
//        Collections.addAll(nums, numArray);
//
//        nums.sort(new Comparator<Integer>() {
//            @Override
//            public int compare(Integer o1, Integer o2) {
//                return o1 - o2;
//            }
//        });
//        System.out.println(nums);
//
//        nums.sort(new Comparator<Integer>() {
//            @Override
//            public int compare(Integer o1, Integer o2) {
//                return o2 - o1;
//            }
//        });
//        System.out.println(nums);
//
//        nums.sort((a, b) -> a - b);
//        System.out.println(nums);
//        nums.sort((a, b) -> b - a);
//        System.out.println(nums);

//        new Thread(() -> {
//            System.out.println("run");
//        }).start();


//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                System.out.println("run");
//            }
//        }).start();


//        Runnable task = new Runnable() {
//            public void run() {
//                System.out.println("run");
//            }
//        };
//        new Thread(task).start();
//

//        Comparator<String> comparator = new Comparator<String>() {
//            public int compare(String o1, String o2) {
//                return o1.compareTo(o2);
//            }
//        };


//        UnaryOperator<Integer> minus = new UnaryOperator<Integer>() {
//            @Override
//            public Integer exec(Integer integer) {
//                return -integer;
//            }
//        };
//        BinaryOperator<Integer> add = new BinaryOperator<Integer>() {
//            @Override
//            public Integer exec(Integer t1, Integer t2) {
//                return t1 + t2;
//            }
//        };
//        System.out.println(minus.exec(123));
//        System.out.println(add.exec(1, 2));
//
//        UnaryOperator<Integer> minusWithType = (Integer i) -> -i;
//        BinaryOperator<Integer> addWithType = (Integer x, Integer y) -> x + y;
//        System.out.println(minusWithType.exec(123));
//        System.out.println(addWithType.exec(1, 2));
//
//        UnaryOperator<Integer> minusWithInference = i -> -i;
//        BinaryOperator<Integer> addWithInference = (x, y) -> x + y;
//        System.out.println(minusWithInference.exec(123));
//        System.out.println(addWithInference.exec(1, 2));
    }
}
