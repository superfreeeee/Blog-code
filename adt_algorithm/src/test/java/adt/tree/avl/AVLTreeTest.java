package adt.tree.avl;

import adt.tree.bst.BinarySearchTree;
import org.junit.Test;

import static org.junit.Assert.*;

public class AVLTreeTest {

    @Test
    public void test_avl() {
        BinarySearchTree<Integer> t = new AVLTreeImpl<Integer>();
        for (int i = 0; i < 10; i++) {
            t.insert(i, i + 10);
            System.out.println(t);
        }
        System.out.println("start delete");
        t.delete(3);
        System.out.println(t);
        t.delete(5);
        System.out.println(t);
        t.delete(6);
        System.out.println(t);
    }
}