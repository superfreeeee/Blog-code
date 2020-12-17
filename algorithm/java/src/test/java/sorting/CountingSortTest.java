package sorting;

import org.junit.Test;

import static org.junit.Assert.*;

public class CountingSortTest {
    @Test
    public void test_1() {
        int[] A = new int[]{2, 5, 3, 0, 2, 3, 0, 3};
        int k = 5;
        int[] B = new int[]{0, 0, 2, 2, 3, 3, 3, 5};
        int[] res = CountingSort.sort(A, k);
        assertArrayEquals(B, res);
    }
}