package adt.linkedlist;

/**
 * 单向链表实现
 * @param <T>
 */
public class LinkedListSingle<T> implements LinkedList<T> {

    private static class SingleNode<T> {
        T data;
        SingleNode<T> next;

        public SingleNode(T data) {
            this.data = data;
        }

        @Override
        public String toString() {
            return data + (next == null ? "" : " -> " + next);
        }
    }

    private SingleNode<T> head;

    /**
     * 添加元素到指定下标
     *
     * @param index
     * @param t
     */
    @Override
    public void add(int index, T t) {
        if (index < 0 || index > size()) return;
        SingleNode<T> cur = head, node = new SingleNode<>(t);
        if (index == 0) {
            node.next = cur;
            head = node;
            return;
        }
        while (--index > 0) cur = cur.next;
        node.next = cur.next;
        cur.next = node;
    }

    /**
     * 获取指定下标元素
     *
     * @param index
     * @return
     */
    @Override
    public T get(int index) {
        if (index < 0 || index >= size()) return null;
        SingleNode<T> cur = head;
        while (index-- > 0) cur = cur.next;
        return cur.data;
    }

    /**
     * 移除指定下标元素
     *
     * @param index
     * @return
     */
    @Override
    public T remove(int index) {
        if (index < 0 || index >= size()) return null;
        SingleNode<T> cur = head;
        if (index == 0) {
            head = head.next;
            return cur.data;
        }
        while (--index > 0) cur = cur.next;
        SingleNode<T> res = cur.next;
        cur.next = cur.next.next;
        return res.data;
    }

    /**
     * 获取链表大小
     *
     * @return
     */
    @Override
    public int size() {
        SingleNode<T> cur = head;
        int size = 0;
        while (cur != null) {
            cur = cur.next;
            size++;
        }
        return size;
    }

    /**
     * 判断链表是否为空
     *
     * @return
     */
    @Override
    public boolean empty() {
        return head == null;
    }

    /**
     * 查看实际结构和内容
     */
    @Override
    public void info() {
        System.out.println("LinkedListSingle: " + head);
    }
}
