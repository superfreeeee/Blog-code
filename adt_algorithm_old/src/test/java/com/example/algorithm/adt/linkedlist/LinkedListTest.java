package com.example.algorithm.adt.linkedlist;

import com.example.algorithm.adt.linkedlist.LinkedList;
import com.example.algorithm.adt.linkedlist.LinkedListCircularSentinel;
import com.example.algorithm.adt.linkedlist.LinkedListDouble;
import com.example.algorithm.adt.linkedlist.LinkedListSingle;
import org.junit.Test;

import static org.junit.Assert.*;

public class LinkedListTest {

    LinkedList<Integer> linkedList;

    @Test
    public void test_linkedlist_single() {
        linkedList = new LinkedListSingle<Integer>();
        test();
    }

    @Test
    public void test_linkedlist_double() {
        linkedList = new LinkedListDouble<Integer>();
        test();
    }

    @Test
    public void test_linkedlist_circular_sentinel() {
        linkedList = new LinkedListCircularSentinel<Integer>();
        test();
    }

    private void test() {
        assertTrue(linkedList.isEmpty());
        System.out.println("create success");

        int size = 10;
        int[] keys = new int[size];
        Integer[] values = new Integer[size];
        for(int i=0 ; i<size ; i++) {
            Integer num = i * 100;
            values[i] = num;
            keys[i] = linkedList.insert(num);
        }
        System.out.println("insert success");

        for(int i=0 ; i<10 ; i++) {
            assertEquals(values[i], linkedList.search(keys[i]));
            assertEquals(null, linkedList.search(-keys[i]));
        }
        System.out.println("search success");

        for(int i=size-1 ; i>=0 ; i--) {
            assertEquals(values[i], linkedList.remove(keys[i]));
            assertEquals(null, linkedList.remove(-keys[i]));
        }
        System.out.println("remove success");

        assertTrue(linkedList.isEmpty());
        System.out.println("test end");
    }
}