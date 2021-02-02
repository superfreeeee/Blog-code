package adt.tree.bst;

import org.junit.Test;

import static org.junit.Assert.*;

public class BinarySearchTreeTest {

    @Test
    public void test_1() {
        BinarySearchTree<Integer> bst = BinarySearchTreeImpl.from(
                new int[]{1, 3, 5, 7, 9, 11, 13},
                new Integer[]{10, 30, 50, 70, 90, 110, 130}
        );
        System.out.println(bst);

        // traversal
        System.out.println("--- traversal ---");
        System.out.println("preorder:");
        bst.preorder();
        System.out.println("\ninorder:");
        bst.inorder();
        System.out.println("\npostorder:");
        bst.postorder();
        System.out.println("\nlayerOrder:");
        bst.layerOrder();

        // others info
        System.out.println("--- others info ---");
        assertEquals(3, bst.height());
        assertEquals(false, bst.empty());
        assertEquals(7, bst.nodes());

        // search & predecessor & successor
        System.out.println("--- search & predecessor & successor ---");
        assertEquals((Integer) 10, bst.search(1));
        assertEquals(null, bst.predecessor(1));
        assertEquals((Integer) 30, bst.successor(1));
        assertEquals((Integer) 70, bst.search(7));
        assertEquals((Integer) 50, bst.predecessor(7));
        assertEquals((Integer) 90, bst.successor(7));
        assertEquals((Integer) 130, bst.search(13));
        assertEquals((Integer) 110, bst.predecessor(13));
        assertEquals(null, bst.successor(13));
        assertEquals(null, bst.search(8));
        assertEquals((Integer) 70, bst.predecessor(8));
        assertEquals((Integer) 90, bst.successor(8));
        assertEquals(null, bst.search(21));
        assertEquals((Integer) 130, bst.predecessor(21));
        assertEquals(null, bst.successor(21));

        // minimum & maximum
        System.out.println("--- minimum & maximum ---");
        assertEquals((Integer) 10, bst.minimum());
        assertEquals((Integer) 130, bst.maximum());

        // delete
        System.out.println("--- delete ---");
        Integer d = bst.delete(3);
        System.out.println(bst);
        assertEquals((Integer) 30, d);
        d = bst.delete(9);
        System.out.println(bst);
        assertEquals((Integer) 90, d);

        // search & predecessor & successor after delete
        System.out.println("--- search & predecessor & successor after delete ---");
        assertEquals((Integer) 10, bst.search(1));
        assertEquals(null, bst.predecessor(1));
        assertEquals((Integer) 50, bst.successor(1));
        assertEquals((Integer) 70, bst.search(7));
        assertEquals((Integer) 50, bst.predecessor(7));
        assertEquals((Integer) 110, bst.successor(7));
        assertEquals((Integer) 130, bst.search(13));
        assertEquals((Integer) 110, bst.predecessor(13));
        assertEquals(null, bst.successor(13));
        assertEquals(null, bst.search(8));
        assertEquals((Integer) 70, bst.predecessor(8));
        assertEquals((Integer) 110, bst.successor(8));
        assertEquals(null, bst.search(21));
        assertEquals((Integer) 130, bst.predecessor(21));
        assertEquals(null, bst.successor(21));

        // others info 2
        System.out.println("--- others info 2 ---");
        assertEquals(3, bst.height());
        assertEquals(false, bst.empty());
        assertEquals(5, bst.nodes());
    }

    @Test
    public void test_2() {
        BinarySearchTree<Integer> bst = BinarySearchTreeImpl.from(
                new int[]{1, 3, 5, 7, 9, 11, 13, 15, 17},
                new Integer[]{1, 3, 5, 7, 9, 11, 13, 15, 17}
        );
        System.out.println(bst);

        // traversal
        System.out.println("--- traversal ---");
        System.out.println("preorder:");
        bst.preorder();
        System.out.println("\ninorder:");
        bst.inorder();
        System.out.println("\npostorder:");
        bst.postorder();
        System.out.println("\nlayerOrder:");
        bst.layerOrder();

        // others info
        System.out.println("--- others info ---");
        assertEquals(4, bst.height());
        assertEquals(false, bst.empty());
        assertEquals(9, bst.nodes());

        // search & predecessor & successor
        System.out.println("--- search & predecessor & successor ---");
        assertEquals((Integer) 1, bst.search(1));
        assertEquals(null, bst.predecessor(1));
        assertEquals((Integer) 3, bst.successor(1));
        assertEquals((Integer) 7, bst.search(7));
        assertEquals((Integer) 5, bst.predecessor(7));
        assertEquals((Integer) 9, bst.successor(7));
        assertEquals((Integer) 13, bst.search(13));
        assertEquals((Integer) 11, bst.predecessor(13));
        assertEquals((Integer) 15, bst.successor(13));
        assertEquals(null, bst.search(8));
        assertEquals((Integer) 7, bst.predecessor(8));
        assertEquals((Integer) 9, bst.successor(8));
        assertEquals(null, bst.search(21));
        assertEquals((Integer) 17, bst.predecessor(21));
        assertEquals(null, bst.successor(21));

        // minimum & maximum
        System.out.println("--- minimum & maximum ---");
        assertEquals((Integer) 1, bst.minimum());
        assertEquals((Integer) 17, bst.maximum());

        // delete
        System.out.println("--- delete ---");
        Integer d = bst.delete(3);
        System.out.println(bst);
        assertEquals((Integer) 3, d);
        d = bst.delete(9);
        System.out.println(bst);
        assertEquals((Integer) 9, d);
        d = bst.delete(11);
        System.out.println(bst);
        assertEquals((Integer) 11, d);

        // search & predecessor & successor after delete
        System.out.println("--- search & predecessor & successor after delete ---");
        assertEquals((Integer) 1, bst.search(1));
        assertEquals(null, bst.predecessor(1));
        assertEquals((Integer) 5, bst.successor(1));
        assertEquals((Integer) 7, bst.search(7));
        assertEquals((Integer) 5, bst.predecessor(7));
        assertEquals((Integer) 13, bst.successor(7));
        assertEquals((Integer) 13, bst.search(13));
        assertEquals((Integer) 7, bst.predecessor(13));
        assertEquals((Integer) 15, bst.successor(13));
        assertEquals(null, bst.search(8));
        assertEquals((Integer) 7, bst.predecessor(8));
        assertEquals((Integer) 13, bst.successor(8));
        assertEquals(null, bst.search(21));
        assertEquals((Integer) 17, bst.predecessor(21));
        assertEquals(null, bst.successor(21));

        // others info 2
        System.out.println("--- others info 2 ---");
        assertEquals(4, bst.height());
        assertEquals(false, bst.empty());
        assertEquals(6, bst.nodes());
    }
}