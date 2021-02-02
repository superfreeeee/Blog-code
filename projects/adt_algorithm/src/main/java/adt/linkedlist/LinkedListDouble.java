package adt.linkedlist;

/**
 * 双向链表实现
 *
 * @param <T>
 */
public class LinkedListDouble<T> implements LinkedList<T> {

    private static class DoubleNode<T> {
        T data;
        DoubleNode<T> prev;
        DoubleNode<T> next;

        public DoubleNode(T data) {
            this.data = data;
        }

        String forward() {
            return data + (next == null ? "" : " => " + next.forward());
        }

        String backward() {
            return (prev == null ? "" : prev.backward() + " <= ") + data;
        }

    }

    private DoubleNode<T> head;
    private DoubleNode<T> tail;

    @Override
    public void add(int index, T t) {
        int size = size();
        if (index < 0 || index > size) return;
        if (size > 1 && index >= size / 2) {
            addFromTail(size - index, t);
            return;
        }
        DoubleNode<T> cur = head, node = new DoubleNode<>(t);
        if (size == 0) {
            head = tail = node;
            return;
        }
        if (index == 0) {
            node.next = head;
            head.prev = node;
            head = node;
            return;
        }
        while (--index > 0) cur = cur.next;
        node.next = cur.next;
        node.prev = cur;
        if (cur.next != null) cur.next.prev = node;
        cur.next = node;
        if (size == 1) tail = node;
    }

    private void addFromTail(int index, T t) {
        DoubleNode<T> cur = tail, node = new DoubleNode<>(t);
        if (index == 0) {
            node.prev = tail;
            tail.next = node;
            tail = node;
            return;
        }
        while (--index > 0) cur = cur.prev;
        node.prev = cur.prev;
        node.next = cur;
        cur.prev.next = node;
        cur.prev = node;
    }

    @Override
    public T get(int index) {
        int size = size();
        if (index < 0 || index >= size) return null;
        if (index >= size / 2) return getFromTail(size - 1 - index);
        DoubleNode<T> cur = head;
        while (index-- > 0) cur = cur.next;
        return cur.data;
    }

    private T getFromTail(int index) {
        DoubleNode<T> cur = tail;
        while (index-- > 0) cur = cur.prev;
        return cur.data;
    }

    @Override
    public T remove(int index) {
        int size = size();
        if (index < 0 || index >= size) return null;
        if (size == 0) {
            head = tail = null;
            return null;
        }
        if (size == 1) {
            T res = head.data;
            head = tail = null;
            return res;
        }
        if (size > 1 && index >= size / 2) return removeFromTail(size - index - 1);
        if (index == 0) {
            T res = head.data;
            head = head.next;
            head.prev = null;
            return res;
        }
        DoubleNode<T> cur = head;
        while (--index > 0) cur = cur.next;
        T res = cur.next.data;
        if (cur.next.next != null) cur.next.next.prev = cur;
        cur.next = cur.next.next;
        return res;
    }

    private T removeFromTail(int index) {
        if (index == 0) {
            T res = tail.data;
            tail = tail.prev;
            tail.next = null;
            return res;
        }
        DoubleNode<T> cur = tail;
        while (--index > 0) cur = cur.prev;
        T res = cur.prev.data;
        cur.prev.prev.next = cur;
        cur.prev = cur.prev.prev;
        return res;
    }

    @Override
    public int size() {
        DoubleNode<T> cur = head;
        int size = 0;
        while (cur != null) {
            cur = cur.next;
            size++;
        }
        return size;
    }

    @Override
    public boolean empty() {
        return head == null && tail == null;
    }

    @Override
    public String toString() {
        return "LinkedListDouble: " + (empty() ? "empty" : "\nforward: " + head.forward() + "\nbackward: " + tail.backward());
    }
}
