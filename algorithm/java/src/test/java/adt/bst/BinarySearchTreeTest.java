package adt.bst;

import org.junit.Test;

import static org.junit.Assert.*;

public class BinarySearchTreeTest {
    @Test
    public void test_bst_simple() {
        BinarySearchTree<Integer> t = new BSTSimple<Integer>(new int[]{0, 1, 2, 3, 4, 5, 6}, new Integer[]{10, 11, 12, 13, 14, 15, 16});
        t.info();
        assertEquals((Integer) 10, t.minimum());
        assertEquals((Integer) 16, t.maximum());
        assertEquals((Integer) 13, t.search(3));
        t.delete(1);
        t.info();
        t.delete(3);
        t.info();
        assertEquals((Integer) 12, t.search(2));
        assertEquals((Integer) 10, t.predecessor(2));
        assertEquals((Integer) 14, t.successor(2));
    }

    @Test
    public void test_avl() {
        BinarySearchTree<Integer> t = new AVLTree<Integer>();
        for (int i = 0; i < 10; i++) {
            t.insert(i, i + 10);
            t.info();
        }
        System.out.println("start delete");
        t.delete(3);
        t.info();
        t.delete(5);
        t.info();
        t.delete(6);
        t.info();
    }
}