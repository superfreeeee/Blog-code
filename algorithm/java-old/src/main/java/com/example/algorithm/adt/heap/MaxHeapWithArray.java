package com.example.algorithm.adt.heap;

import java.security.InvalidParameterException;

/**
 * 最大堆（數組實現）
 * @param <T>
 */
public class MaxHeapWithArray<T> extends MaxHeap<T> {

    private static final String INCREASE_KEY_INVALID = "new key is smaller than current key";

    /**
     * 堆元素存放數組
     */
    private MaxHeapElement<T>[] A = new MaxHeapElement[0];

    /**
     * 紀錄堆元素個數
     */
    private int size;

    /**
     * 父元素下標
     * @param i
     * @return
     */
    private int parent(int i) {
        return (i - 1) / 2;
    }

    /**
     * 左子樹下標
     * @param i
     * @return
     */
    private int left(int i) {
        return 2 * i + 1;
    }

    /**
     * 右子樹下標
     * @param i
     * @return
     */
    private int right(int i) {
        return 2 * i + 2;
    }

    /**
     * 維持最大堆性質
     *
     * @param i
     */
    public void maxHeapify(int i) {
        int l = left(i), r = right(i), largest = i;
        if(l < size && A[l].compareTo(A[largest]) > 0) largest = l;
        if(r < size && A[r].compareTo(A[largest]) > 0) largest = r;
        if(largest != i) {
            exchange(largest, i);
            maxHeapify(largest);
        }
    }

    /**
     * 輔助方法：交換兩個位置的值
     * @param i
     * @param j
     */
    private void exchange(int i, int j) {
        MaxHeapElement tmp = A[i];
        A[i] = A[j];
        A[j] = tmp;
    }

    /**
     * 重新建立最大堆
     *
     * @param A
     */
    public void build(T[] A, int[] keys) {
        this.size = A.length;
        this.A = new MaxHeapElement[this.size];
        for(int i=0 ; i<this.size ; i++) {
            this.A[i] = new MaxHeapElement(A[i], keys[i]);
        }
        for(int i=parent(this.size - 1) ; i >= 0 ; i--) {
            maxHeapify(i);
        }
    }

    /**
     * 查找最大元素
     *
     * @return
     */
    public T maximum() {
        if(size <= 0) {
            return null;
        }
        return A[0].data;
    }

    /**
     * 查找並移除最大元素
     *
     * @return
     */
    public T extractMax() {
        if(size <= 0) {
            return null;
        }
        MaxHeapElement<T> max = A[0];
        A[0] = A[--size];
        A[size] = null;
        maxHeapify(0);
        return max.data;
    }

    /**
     * 插入元素
     *
     * @param key
     */
    public void insert(int key, T data) {
        if(size >= A.length) {
            extend();
        }
        A[size++] = new MaxHeapElement(data, Integer.MIN_VALUE);
        increaseKey(size - 1, key);
    }

    private void extend() {
        int size = (this.size <= 0) ? 1 : this.size;
        MaxHeapElement[] B = new MaxHeapElement[size * 2];
        for(int i = 0 ; i < this.size ; i++) {
            B[i] = A[i];
        }
        A = B;
    }

    /**
     * 增加元素的鍵
     *
     * @param i
     * @param key
     */
    public void increaseKey(int i, int key) {
        if(key < A[i].key) {
            throw new InvalidParameterException(INCREASE_KEY_INVALID);
        }
        A[i].key = key;
        int p;
        while(i > 0 && A[p = parent(i)].compareTo(A[i]) < 0) {
            exchange(i, p);
            i = p;
        }
    }

    private static final class MaxHeapElement<T> implements Comparable<MaxHeapElement<T>> {
        T data;
        int key;
        MaxHeapElement(T data, int key) {
            this.data = data;
            this.key = key;
        }

        public int compareTo(MaxHeapElement<T> o) {
            return key - o.key;
        }
    }
}
