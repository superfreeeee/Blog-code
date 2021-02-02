package com.example.algorithm.adt.heap;

import java.security.InvalidParameterException;

/**
 * 最小堆（數組實現）
 */
public class MinHeapWithArray<T> extends MinHeap<T> {

    private static final String DECREASE_KEY_INVALID = "new key is larger than current key";

    /**
     * 堆元素存放數組
     */
    private MinHeapElement<T>[] A = new MinHeapElement[0];

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
     * 維持最小堆性質
     *
     * @param i
     */
    public void minHeapify(int i) {
        int l = left(i), r = right(i), smallest = i;
        if(l < size && A[l].compareTo(A[smallest]) < 0) smallest = l;
        if(r < size && A[r].compareTo(A[smallest]) < 0) smallest = r;
        if(smallest != i) {
            exchange(smallest, i);
            minHeapify(smallest);
        }
    }

    /**
     * 輔助方法：交換兩個位置的值
     * @param i
     * @param j
     */
    private void exchange(int i, int j) {
        MinHeapElement tmp = A[i];
        A[i] = A[j];
        A[j] = tmp;
    }

    /**
     * 建立最小堆
     *
     * @param A
     */
    public void build(T[] A, int[] keys) {
        this.size = A.length;
        this.A = new MinHeapElement[this.size];
        for(int i=0 ; i<this.size ; i++) {
            this.A[i] = new MinHeapElement(A[i], keys[i]);
        }
        for(int i=parent(this.size - 1) ; i >= 0 ; i--) {
            minHeapify(i);
        }
    }

    /**
     * 查找最小元素
     *
     * @return
     */
    public T minimum() {
        if(size <= 0) {
            return null;
        }
        return A[0].data;
    }

    /**
     * 查找並移除最小元素
     *
     * @return
     */
    public T extractMin() {
        if(size <= 0) {
            return null;
        }
        MinHeapElement<T> min = A[0];
        A[0] = A[--size];
        A[size] = null;
        minHeapify(0);
        return min.data;
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
        A[size++] = new MinHeapElement(data, Integer.MAX_VALUE);
        decreaseKey(size - 1, key);
    }

    private void extend() {
        int size = (this.size <= 0) ? 1 : this.size;
        MinHeapElement[] B = new MinHeapElement[size * 2];
        for(int i = 0 ; i < this.size ; i++) {
            B[i] = A[i];
        }
        A = B;
    }

    /**
     * 減少元素的鍵
     *
     * @param i
     * @param key
     */
    public void decreaseKey(int i, int key) {
        if(key > A[i].key) {
            throw new InvalidParameterException(DECREASE_KEY_INVALID);
        }
        A[i].key = key;
        int p;
        while(i > 0 && A[p = parent(i)].compareTo(A[i]) > 0) {
            exchange(i, p);
            i = p;
        }
    }


    private static final class MinHeapElement<T> implements Comparable<MinHeapElement<T>> {
        T data;
        int key;
        MinHeapElement(T data, int key) {
            this.data = data;
            this.key = key;
        }

        public int compareTo(MinHeapElement<T> o) {
            return key - o.key;
        }
    }
}
