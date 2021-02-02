package algorithm.select;

import algorithm.select.SelectionKth;
import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class SelectionKthTest {
    @Test
    public void test() {
        int[] A = new int[]{1,3,5,7,9,2,4,6,8,0};
        System.out.println("origin: " + Arrays.toString(A));

        int res = SelectionKth.select(A, 3);
        System.out.println("kth: " + res);
        assertEquals(2, res);

        res = SelectionKth.select(A, 5);
        System.out.println("kth: " + res);
        assertEquals(4, res);

        res = SelectionKth.select(A, 7);
        System.out.println("kth: " + res);
        assertEquals(6, res);
    }
}