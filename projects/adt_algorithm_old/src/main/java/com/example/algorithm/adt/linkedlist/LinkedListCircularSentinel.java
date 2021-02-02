package com.example.algorithm.adt.linkedlist;

/**
 * 帶哨兵（nil）的循環鏈表
 * @param <T>
 */
public class LinkedListCircularSentinel<T> implements LinkedList<T> {

    /**
     * 哨兵指針，同時作為頭尾節點
     */
    private final LinkedListCircularSentinelNode<T> nil;

    /**
     * 構造函數，初始化哨兵（nil <-> nil）
     */
    public LinkedListCircularSentinel() {
        LinkedListCircularSentinelNode<T> nil = new LinkedListCircularSentinelNode<T>(null);
        nil.data = null;
        nil.prev = nil.next = nil;
        this.nil = nil;
    }

    /**
     * 檢查鏈表是否為空
     * @return
     */
    public boolean isEmpty() {
        return nil.next == nil;
    }

    /**
     * 查找元素
     * @param key
     * @return
     */
    public T search(int key) {
        LinkedListCircularSentinelNode<T> node = searchNode(key);
        if(node == nil) {
            return null;
        }
        return node.data;
    }

    /**
     * 查找元素節點
     * @param key
     * @return
     */
    private LinkedListCircularSentinelNode<T> searchNode(int key) {
        LinkedListCircularSentinelNode<T> cur = nil.next;
        while(cur != nil && cur.key != key) {
            cur = cur.next;
        }
        return cur;
    }

    /**
     * 插入元素（插入到 nil 之後，即 nil <-> newNode <-> oldNode）
     * @param data
     * @return
     */
    public int insert(T data) {
        LinkedListCircularSentinelNode<T> node = new LinkedListCircularSentinelNode<T>(data);
        node.prev = nil;
        node.next = nil.next;
        node.next.prev = node;
        nil.next = node;
        return node.key;
    }

    /**
     * 移除元素
     * @param key
     * @return
     */
    public T remove(int key) {
        LinkedListCircularSentinelNode<T> node = searchNode(key);
        if(node == nil) {
            return nil.data;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;
        return node.data;
    }

//    public void printData() {
//        LinkedListCircularSentinelNode<T> node = nil;
//        System.out.print("forward: " + nil.data);
//        do {
//            node = node.next;
//            System.out.print("->" + node.data);
//        } while(node != nil);
//        System.out.println();
//
//        node = nil;
//        System.out.print("reverse: " + nil.data);
//        do {
//            node = node.prev;
//            System.out.print("->" + node.data);
//        } while(node != nil);
//        System.out.println();
//    }

    /**
     * 鏈表節點類
     * @param <T>
     */
    private static final class LinkedListCircularSentinelNode<T> {
        static int count = 0;
        T data;
        int key;
        LinkedListCircularSentinelNode<T> prev;
        LinkedListCircularSentinelNode<T> next;

        LinkedListCircularSentinelNode(T data) {
            this.data = data;
            this.key = ++count;
            this.prev = this.next = null;
        }
    }
}
