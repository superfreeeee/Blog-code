package com.example.algorithm.sorting;

/**
 * 插入排序
 * 時間複雜度：O(n^2)
 * 穩定的
 */
public class InsertionSort {

    /**
     * 排序主方法
     * 主指針 j 從第 1 位走到最後，每次向前換到當前位置 i 小於等於當前值為止
     * @param A 待排序數組
     * @return
     */
    public static int[] sort(int[] A) {
        int[] B = A.clone();
        for(int j=1 ; j<B.length ; j++) {
            int key = B[j], i = j - 1;
            while(i >= 0 && B[i] > key) {
                B[i+1] = B[i];
                i--;
            }
            B[i+1] = key;
        }
        return B;
    }
}
