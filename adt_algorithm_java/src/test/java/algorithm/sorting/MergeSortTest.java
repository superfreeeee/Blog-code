package algorithm.sorting;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class MergeSortTest {
    @Test
    public void test() {
        int[] A = new int[]{1,3,5,7,9,2,4,6,8,0};
        int[] ans = new int[]{0,1,2,3,4,5,6,7,8,9};
        System.out.println("origin: " + Arrays.toString(A));
        MergeSort.sort(A);
        System.out.println("sorted: " + Arrays.toString(A));
        assertArrayEquals(ans, A);
    }
}