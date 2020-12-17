package com.example.algorithm.adt.bst;

import org.junit.Test;

import static org.junit.Assert.*;

public class AVLTreeTest {
    @Test
    public void test_1() {
        AVLTree<Integer> t = new AVLTree<Integer>();
        String[] preList  = new String[]{"1 ", "1 2 ", "2 1 3 ", "2 1 3 4 ", "2 1 4 3 5 ", "4 2 1 3 5 6 ", "4 2 1 3 6 5 7 "};
        String[] inList   = new String[]{"1 ", "1 2 ", "1 2 3 ", "1 2 3 4 ", "1 2 3 4 5 ", "1 2 3 4 5 6 ", "1 2 3 4 5 6 7 "};
        String[] postList = new String[]{"1 ", "2 1 ", "1 3 2 ", "1 4 3 2 ", "1 3 5 4 2 ", "1 3 2 6 5 4 ", "1 3 2 5 7 6 4 "};
        for(int i=1 ; i<=7 ; i++) {
            t.insert(i, i);
            t.print();
            String pre = t.preorderWalk();
            String in = t.inorderWalk();
            String post = t.postorderWalk();
            assertEquals(preList[i - 1], pre);
            assertEquals(inList[i - 1], in);
            assertEquals(postList[i - 1], post);
        }

        assertEquals(null, t.search(-1));
        assertEquals(2, (int)t.search(2));
    }

    @Test
    public void test_2() {
        AVLTree<Integer> bst = new AVLTree<Integer>();
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
}