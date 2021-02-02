package com.example.algorithm.adt.linkedlist;

/**
 * 雙向鏈表
 * @param <T>
 */
public class LinkedListDouble<T> implements LinkedList<T> {

    /**
     * 頭尾指針
     */
    private LinkedListDoubleNode<T> head;
    private LinkedListDoubleNode<T> tail;

    public LinkedListDouble() {}

    /**
     * 判斷鏈表為空
     * @return
     */
    public boolean isEmpty() {
        return head == null && tail == null;
    }

    /**
     * 查找元素
     * @param key
     * @return
     */
    public T search(int key) {
        LinkedListDoubleNode<T> node = searchNode(key);
        if(node == null) {
            return null;
        }
        return node.data;
    }

    /**
     * 查找節點輔助方法
     * @param key
     * @return
     */
    private LinkedListDoubleNode<T> searchNode(int key) {
        LinkedListDoubleNode<T> cur = tail;
        while(cur != null) {
            if(cur.key == key) {
                return cur;
            }
            cur = cur.prev;
        }
        return null;
    }

    /**
     * 插入數據
     * @param data
     * @return
     */
    public int insert(T data) {
        LinkedListDoubleNode<T> node = new LinkedListDoubleNode<T>(data);
        if(head == null) {
            head = tail = node;
            return node.key;
        }
        node.prev = tail;
        tail = tail.next = node;
        return node.key;
    }

    /**
     * 刪除元素
     * @param key
     * @return
     */
    public T remove(int key) {
        LinkedListDoubleNode<T> node = searchNode(key);
        if(node == null) {
            return null;
        }
        if(node.prev != null) {
            node.prev.next = node.next;
        } else {
            head = node.next;
            if(head != null) {
                head.prev = null;
            }
        }
        if(node.next != null) {
            node.next.prev = node.prev;
        } else {
            tail = node.prev;
            if(tail != null) {
                tail.next = null;
            }
        }
        return node.data;
    }

    /**
     * 鏈表內部節點類
     * @param <T>
     */
    private static final class LinkedListDoubleNode<T> {
        static int count = 0;
        T data;
        int key;
        LinkedListDoubleNode<T> prev;
        LinkedListDoubleNode<T> next;

        LinkedListDoubleNode(T data) {
            this.data = data;
            this.key = ++count;
            this.prev = null;
            this.next = null;
        }
    }
}
