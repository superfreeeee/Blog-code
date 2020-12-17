package com.example.algorithm.adt.linkedlist;

/**
 * 單向鏈表
 * @param <T>
 */
public class LinkedListSingle<T> implements LinkedList<T> {

    /**
     * 表頭指針
     */
    private LinkedListSingleNode<T> head;

    public LinkedListSingle() {}

    /**
     * 判斷鏈表是否為空
     * @return
     */
    public boolean isEmpty() {
        return head == null;
    }

    /**
     * 查找元素
     * @param key 元素鍵
     * @return
     */
    public T search(int key) {
        LinkedListSingleNode<T> cur = head;
        while(cur != null) {
            if(cur.key == key) {
                return cur.data;
            }
            cur = cur.next;
        }
        return null;
    }

    /**
     * 插入元素
     * @param t
     * @return
     */
    public int insert(T t) {
        LinkedListSingleNode<T> node = new LinkedListSingleNode<T>(t);
        if(head == null) {
            head = node;
            return node.key;
        }
        LinkedListSingleNode<T> cur = head;
        while(cur.next != null) {
            cur = cur.next;
        }
        cur.next = node;
        return node.key;
    }

    /**
     * 刪除元素
     * @param key 元素鍵
     * @return
     */
    public T remove(int key) {
        if(head != null && head.key == key) {
            LinkedListSingleNode<T> res = head;
            head = head.next;
            return res.data;
        }
        LinkedListSingleNode<T> prev = head;
        LinkedListSingleNode<T> cur;
        while(prev != null) {
            cur = prev.next;
            if(cur != null && cur.key == key) {
                prev.next = cur.next;
                return cur.data;
            }
            prev = cur;
        }
        return null;
    }

    /**
     * 鏈表內部節點類
     * @param <T>
     */
    private static final class LinkedListSingleNode<T> {
        static int count = 0;
        T data;
        LinkedListSingleNode<T> next;
        int key;

        LinkedListSingleNode(T data) {
            this.data = data;
            this.next = null;
            this.key = ++count;
        }
    }
}
