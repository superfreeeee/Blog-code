package adt.disjointset;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class DisjointSetTest {

    /**
     * {{1, 2, 3}, {4}, {0, 5}}
     */
    @Test
    public void test_1() {
        Integer[] nums = new Integer[]{0, 1, 2, 3, 4, 5};
        DisjointSet<Integer> set = new DisjointSetForest<>(Arrays.asList(nums));
        set.union(0, 5);
        set.union(1, 2);
        set.union(2, 3);
        System.out.println(set);
        // {0, 5}
        assertEquals(true, set.same(0, 0));
        assertEquals(false, set.same(0, 1));
        assertEquals(false, set.same(0, 2));
        assertEquals(false, set.same(0, 3));
        assertEquals(false, set.same(0, 4));
        assertEquals(true, set.same(0, 5));
        // {1, 2, 3}
        assertEquals(false, set.same(2, 0));
        assertEquals(true, set.same(2, 1));
        assertEquals(true, set.same(2, 2));
        assertEquals(true, set.same(2, 3));
        assertEquals(false, set.same(2, 4));
        assertEquals(false, set.same(2, 5));
        // {4}
        assertEquals(false, set.same(4, 0));
        assertEquals(false, set.same(4, 1));
        assertEquals(false, set.same(4, 2));
        assertEquals(false, set.same(4, 3));
        assertEquals(true, set.same(4, 4));
        assertEquals(false, set.same(4, 5));
    }

    /**
     * {{a, b, c, d}, {e, f, g}, {h, i}, {j}}
     */
    @Test
    public void test_2() {
        Character[] chars = new Character[]{'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'};
        DisjointSet<Character> set = new DisjointSetForest<>(Arrays.asList(chars));
        set.union(chars[0], chars[1]);
        set.union(chars[0], chars[2]);
        set.union(chars[0], chars[3]);
        set.union(chars[4], chars[5]);
        set.union(chars[4], chars[6]);
        set.union(chars[7], chars[8]);
        System.out.println(set);
        // {a, b, c, d}
        assertEquals(true, set.same(chars[2], chars[0]));
        assertEquals(true, set.same(chars[2], chars[1]));
        assertEquals(true, set.same(chars[2], chars[2]));
        assertEquals(true, set.same(chars[2], chars[3]));
        assertEquals(false, set.same(chars[2], chars[4]));
        assertEquals(false, set.same(chars[2], chars[5]));
        assertEquals(false, set.same(chars[2], chars[6]));
        assertEquals(false, set.same(chars[2], chars[7]));
        assertEquals(false, set.same(chars[2], chars[8]));
        assertEquals(false, set.same(chars[2], chars[9]));
        // {e, f, g}
        assertEquals(false, set.same(chars[6], chars[0]));
        assertEquals(false, set.same(chars[6], chars[1]));
        assertEquals(false, set.same(chars[6], chars[2]));
        assertEquals(false, set.same(chars[6], chars[3]));
        assertEquals(true, set.same(chars[6], chars[4]));
        assertEquals(true, set.same(chars[6], chars[5]));
        assertEquals(true, set.same(chars[6], chars[6]));
        assertEquals(false, set.same(chars[6], chars[7]));
        assertEquals(false, set.same(chars[6], chars[8]));
        assertEquals(false, set.same(chars[6], chars[9]));
        // {h, i}
        assertEquals(false, set.same(chars[8], chars[0]));
        assertEquals(false, set.same(chars[8], chars[1]));
        assertEquals(false, set.same(chars[8], chars[2]));
        assertEquals(false, set.same(chars[8], chars[3]));
        assertEquals(false, set.same(chars[8], chars[4]));
        assertEquals(false, set.same(chars[8], chars[5]));
        assertEquals(false, set.same(chars[8], chars[6]));
        assertEquals(true, set.same(chars[8], chars[7]));
        assertEquals(true, set.same(chars[8], chars[8]));
        assertEquals(false, set.same(chars[8], chars[9]));
        // {j}
        assertEquals(false, set.same(chars[9], chars[0]));
        assertEquals(false, set.same(chars[9], chars[1]));
        assertEquals(false, set.same(chars[9], chars[2]));
        assertEquals(false, set.same(chars[9], chars[3]));
        assertEquals(false, set.same(chars[9], chars[4]));
        assertEquals(false, set.same(chars[9], chars[5]));
        assertEquals(false, set.same(chars[9], chars[6]));
        assertEquals(false, set.same(chars[9], chars[7]));
        assertEquals(false, set.same(chars[9], chars[8]));
        assertEquals(true, set.same(chars[9], chars[9]));
    }
}