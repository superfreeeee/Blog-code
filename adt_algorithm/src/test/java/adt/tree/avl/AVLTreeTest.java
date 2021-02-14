package adt.tree.avl;

import org.junit.Test;

import static org.junit.Assert.*;

public class AVLTreeTest {

    private void show(AVLTree tree) {
        tree.tree();
        tree.inorder();
        System.out.println();
    }

    @Test
    public void test_avl() {
        AVLTree<Integer, Integer> avlTree = new AVLTreeImpl<>();
        for (int i = 10; i > 0; i--) {
            System.out.println("--- insert: " + i + " ---");
            avlTree.insert(i, i);
            show(avlTree);
        }
        System.out.println("--- delete: 2 ---");
        assertEquals((Integer) 2, avlTree.delete(2));
        show(avlTree);
        System.out.println("--- delete: 9 ---");
        assertEquals((Integer) 9, avlTree.delete(9));
        show(avlTree);
        System.out.println("--- delete: 11 ---");
        assertEquals(null, avlTree.delete(11));
        System.out.println("--- delete: 7 ---");
        assertEquals((Integer) 7, avlTree.delete(7));
        show(avlTree);
    }
}