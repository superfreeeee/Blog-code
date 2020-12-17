package com.example.algorithm.adt.stack;

import com.example.algorithm.adt.stack.Stack;
import com.example.algorithm.adt.stack.StackWithArray;
import com.example.algorithm.adt.stack.StackWithLinkedList;
import org.junit.Test;

import static org.junit.Assert.*;

public class StackTest {

    Stack<Integer> stack;

    @Test
    public void test_stack_with_array() {
        stack = new StackWithArray<Integer>();
        test_1();
        stack = new StackWithArray<Integer>(1);
        test_2();
    }

    @Test
    public void test_stack_with_linkedlist() {
        stack = new StackWithLinkedList<Integer>();
        test_1();
    }

    private void test_1() {
        Integer[] nums = new Integer[]{1, 3, 5, 7};
        for(Integer num : nums) {
            stack.push(num);
        }
        for(int i=nums.length-1 ; i>=0 ; i--) {
            assertEquals(nums[i], stack.pop());
        }
    }

    private void test_2() {
        assertEquals(true, stack.isEmpty());

        boolean throwed = false;
        stack.push(2);
        try {
            stack.push(2);
        } catch (IndexOutOfBoundsException e) {
            throwed = true;
        }
        assertTrue(throwed);

        throwed = false;
        stack.pop();
        try {
            stack.pop();
        } catch (IndexOutOfBoundsException e) {
            throwed = true;
        }
        assertTrue(throwed);
    }
}