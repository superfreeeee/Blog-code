package adt.tree.rb;

import org.junit.Test;

import static org.junit.Assert.*;

public class RedBlackTreeTest {

    @Test
    public void test_insert() {
        RedBlackTree<Integer, Integer> t = new RedBlackTreeImpl<>();
        int[] nums = new int[]{11, 2, 14, 1, 7, 15, 5, 8, 4};
        for (int num : nums) {
            t.insert(num, num);
            t.tree();
        }
    }

    @Test
    public void test_delete() {
        RedBlackTree<Integer, Integer> t = new RedBlackTreeImpl<>();
        for (int i = 1; i <= 15; i++) {
            t.insert(i, i);
            t.validate();
        }
        t.tree();
        assertEquals((Integer) 14, t.delete(14));
        t.tree();
        assertEquals((Integer) 8, t.delete(8));
        t.tree();
        assertEquals(3, t.height());
        t.validate();
    }

    @Test
    public void test_general() {
        RedBlackTree<Integer, Integer> t = new RedBlackTreeImpl<>();
        for (int i = 1; i <= 20; i++) {
            int key = i % 2 == 0 ? 10 + i / 2 : 10 - i / 2;
            t.insert(key, key);
            t.validate();
        }
        t.tree();

        // search
        for (int i = 1; i <= 20; i++) {
            assertEquals((Integer) i, t.search(i));
        }
        assertEquals(null, t.search(21));
        assertEquals(null, t.search(22));
        assertEquals(null, t.search(100));
        assertEquals(null, t.search(0));

        // minimum & maximum
        assertEquals((Integer) 1, t.minimum());
        assertEquals((Integer) 20, t.maximum());

        // predecessor & successor
        for (int i = 2; i < 20; i++) {
            assertEquals((Integer) (i - 1), t.predecessor(i));
            assertEquals((Integer) (i + 1), t.successor(i));
        }
        assertEquals(null, t.predecessor(1));
        assertEquals(null, t.predecessor(0));
        assertEquals(null, t.predecessor(-1));
        assertEquals((Integer) 20, t.predecessor(21));
        assertEquals((Integer) 20, t.predecessor(22));
        assertEquals((Integer) 20, t.predecessor(23));

        assertEquals(null, t.successor(20));
        assertEquals(null, t.successor(21));
        assertEquals(null, t.successor(22));
        assertEquals((Integer) 1, t.successor(0));
        assertEquals((Integer) 1, t.successor(-1));
        assertEquals((Integer) 1, t.successor(-2));

        // height &
        assertEquals(3, t.height());
        assertEquals(false, t.empty());
        assertEquals(20, t.nodes());

        // traversal
        System.out.println("----- preorder -----");
        t.preorder();
        System.out.println("----- inorder -----");
        t.inorder();
        System.out.println("----- postorder -----");
        t.postorder();
        System.out.println("----- layerOrder -----");
        t.layerorder();

        t.validate();
    }
}