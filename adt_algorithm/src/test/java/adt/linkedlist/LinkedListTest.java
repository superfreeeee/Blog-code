package adt.linkedlist;

import org.junit.Test;

import static org.junit.Assert.*;

public class LinkedListTest {

    @Test
    public void test_linked_list_single() {
        LinkedList<Integer> list = new LinkedListSingle<>();
        assertEquals(true, list.empty());
        for (int i = 0; i < 10; i++) {
            list.add(i);
            assertEquals((Integer) i, list.get(i));
            assertEquals(i + 1, list.size());
        }

        for (int i = 1; i < 10; i += 2) {
            assertEquals((Integer) i, list.get(i));
        }

        list.removeFirst();
        assertEquals((Integer) 1, list.getFirst());
        list.removeLast();
        assertEquals((Integer) 8, list.getLast());
        list.remove(4);
        assertEquals((Integer) 6, list.get(4));
    }

    @Test
    public void test_linked_list_double() {
        LinkedList<Integer> list = new LinkedListDouble<>();
        assertEquals(true, list.empty());
        System.out.println("Insert 1");
        for (int i = 0; i < 10; i++) {
            list.add(i);
            System.out.println(list);
            assertEquals((Integer) i, list.get(i));
            assertEquals(i + 1, list.size());
        }

        for (int i = 1; i < 10; i += 2) {
            assertEquals((Integer) i, list.get(i));
        }

        System.out.println("Insert 2");
        for (int i = 1; i < 10; i += 2) {
            list.add(10 - i, i);
            System.out.println(list);
        }

        System.out.println("remove 1");
        list.removeFirst();
        System.out.println(list);
        assertEquals((Integer) 9, list.getFirst());
        list.removeLast();
        System.out.println(list);
        assertEquals((Integer) 1, list.getLast());
        list.remove(4);
        System.out.println(list);
        assertEquals((Integer) 4, list.get(4));
        list.remove(8);
        System.out.println(list);
        assertEquals((Integer) 7, list.get(8));

        System.out.println("remove 2");
        for (int i = 0; i < 11; i++) {
            list.remove(0);
            System.out.println(list);
        }

        System.out.println("insert 3");
        for (int i = 0; i < 3; i++) {
            list.add(i * 10);
            System.out.println(list);
            assertEquals((Integer) (i * 10), list.getLast());
        }

        System.out.println("remove 3");
        for (int i = 2; i >= 0; i--) {
            list.remove(i);
            System.out.println(list);
        }
    }
}