package adt.stack;

import org.junit.Test;

import static org.junit.Assert.*;

public class StackTest {
    @Test
    public void test_stack_with_array() {
        Stack<Integer> stack = new StackWithArray<Integer>();
        Integer[] nums = new Integer[]{0, 4, 1, 5, 2, 6, 3, 0, 4, 7};
        for(int i=0 ; i<10 ; i++) stack.push(nums[i]);
        for(int i=9 ; i>=4 ; i--) {
            assertEquals(nums[i], stack.pop());
        }
        assertEquals((Integer)5, stack.top());
    }
}