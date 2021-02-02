package com.example.algorithm.sorting;

/**
 * 計數排序
 * 限定條件：元素數值範圍 [0, k]
 * 時間複雜度：O(k + n)
 * 穩定的
 */
public class CountingSort {

    /**
     * 排序對外接口
     * @param A
     * @param k
     * @return
     */
    public static int[] sort(int[] A, int k) {
        int[] B = new int[A.length];
        sort(A, B, k);
        return B;
    }

    /**
     * 排序主方法
     * 紀錄各個值出現的次數，從後往前重新調整次序
     * @param A
     * @param B
     * @param k
     */
    private static void sort(int[] A, int[] B, int k) {
        int[] C = new int[k + 1];
        for(int a : A) {
            C[a]++;
        }
        for(int i=1 ; i <= k ; i++) {
            C[i] += C[i - 1];
        }
        for(int i=A.length - 1 ; i >= 0 ; i--) {
            C[A[i]]--;
            B[C[A[i]]] = A[i];
        }
    }
}
