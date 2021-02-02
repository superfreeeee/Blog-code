package com.example.algorithm.adt.bst;

import org.junit.Test;

import static org.junit.Assert.*;

public class BinarySearchTreeImplTest {

    @Test
    public void test_1() {
        BinarySearchTree<Integer> bst = new BinarySearchTreeImpl<Integer>();
        for(int i : new int[]{6, 5, 7, 2, 5, 8}) {
            bst.insert(i, i);
        }
        String pre = bst.preorderWalk();
        String in = bst.inorderWalk();
        String post = bst.postorderWalk();
        System.out.println("preorder: " + pre);
        System.out.println("inorder: " + in);
        System.out.println("postorder: " + post);
        assertEquals("6 5 2 5 7 8 ", pre);
        assertEquals("2 5 5 6 7 8 ", in);
        assertEquals("2 5 5 8 7 6 ", post);

        // test search
        assertEquals(2, (int)bst.search(2));
        assertEquals(null, bst.search(3));
        assertEquals(5, (int)bst.search(5));
        assertEquals(6, (int)bst.search(6));
        assertEquals(7, (int)bst.search(7));
        System.out.println("test search pass");

        // test max / min
        assertEquals(2, (int)bst.minimum());
        assertEquals(8, (int)bst.maximum());
        System.out.println("test maximum / minimum pass");

        // test predecessor
        assertEquals(2, (int)bst.predecessor(5));
        assertEquals(5, (int)bst.predecessor(6));
        assertEquals(6, (int)bst.predecessor(7));
        assertEquals(7, (int)bst.predecessor(8));
        System.out.println("test predecessor pass");

        // test successor
        assertEquals(5, (int)bst.successor(2));
        assertEquals(5, (int)bst.successor(5));
        assertEquals(7, (int)bst.successor(6));
        assertEquals(8, (int)bst.successor(7));
        System.out.println("test successor pass");
    }

    @Test
    public void test_2() {
        BinarySearchTree<Integer> bst = new BinarySearchTreeImpl<Integer>();
        for(int i : new int[]{2, 5, 7, 6, 8, 5}) {
            bst.insert(i, i);
        }
        String pre = bst.preorderWalk();
        String in = bst.inorderWalk();
        String post = bst.postorderWalk();
        System.out.println("preorder: " + pre);
        System.out.println("inorder: " + in);
        System.out.println("postorder: " + post);
        assertEquals("2 5 7 6 5 8 ", pre);
        assertEquals("2 5 5 6 7 8 ", in);
        assertEquals("5 6 8 7 5 2 ", post);

        // test search
        assertEquals(2, (int)bst.search(2));
        assertEquals(null, bst.search(3));
        assertEquals(5, (int)bst.search(5));
        assertEquals(6, (int)bst.search(6));
        assertEquals(7, (int)bst.search(7));
        System.out.println("test search pass");

        // test max / min
        assertEquals(2, (int)bst.minimum());
        assertEquals(8, (int)bst.maximum());
        System.out.println("test maximum / minimum pass");

        // test predecessor
        assertEquals(2, (int)bst.predecessor(5));
        assertEquals(5, (int)bst.predecessor(6));
        assertEquals(6, (int)bst.predecessor(7));
        assertEquals(7, (int)bst.predecessor(8));
        System.out.println("test predecessor pass");

        // test successor
        assertEquals(5, (int)bst.successor(2));
        assertEquals(5, (int)bst.successor(5));
        assertEquals(7, (int)bst.successor(6));
        assertEquals(8, (int)bst.successor(7));
        System.out.println("test successor pass");
    }

}