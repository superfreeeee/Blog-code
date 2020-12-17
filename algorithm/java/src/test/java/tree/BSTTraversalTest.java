package tree;

import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class BSTTraversalTest {

    private BSTTraversal<Integer> bst;

    @Before
    public void setUp() throws Exception {
        bst = new BSTTraversal<>(new int[]{0, 1, 2, 3, 4, 5, 6}, new Integer[]{10, 11, 12, 13, 14, 15, 16});
        bst.info();
    }

    @Test
    public void test_preorder_traversal() {
        List<Integer> res = bst.preorderTraversal();
        List<Integer> ans = Arrays.asList(new Integer[]{13, 11, 10, 12, 15, 14, 16});
        assertEquals(ans, res);
    }

    @Test
    public void test_inorder_traversal() {
        List<Integer> res = bst.inorderTraversal();
        List<Integer> ans = Arrays.asList(new Integer[]{10, 11, 12, 13, 14, 15, 16});
        assertEquals(ans, res);
    }

    @Test
    public void test_postorder_traversal() {
        List<Integer> res = bst.postorderTraversal();
        List<Integer> ans = Arrays.asList(new Integer[]{10, 12, 11, 14, 16, 15, 13});
        assertEquals(ans, res);
    }

    @Test
    public void test_layer_traversal() {
        List<Integer> res = bst.layerTraversal();
        List<Integer> ans = Arrays.asList(new Integer[]{13, 11, 15, 10, 12, 14, 16});
        assertEquals(ans, res);
    }
}