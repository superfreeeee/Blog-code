package com.example.algorithm.sorting;

/**
 * 歸併排序
 * 時間複雜度：O(nlgn)
 * 穩定的
 */
public class MergeSort {

    /**
     * 主方法對外接口
     * @param A 待排序數組
     * @return
     */
    public static int[] sort(int[] A) {
        int[] B = A.clone();
        sort(B, 0, B.length - 1);
        return B;
    }

    /**
     * 主方法實現主體，首次調用 sort(B, 0, B.length - 1)
     * 將數組分為左右兩部分 [p, q] & [q+1, r] 分別排序後合併 merge
     * @param A
     * @param p
     * @param r
     */
    private static void sort(int[] A, int p, int r) {
        if(p < r) {
            int q = (p + r) / 2;
            sort(A, p, q);
            sort(A, q + 1, r);
            merge(A, p, q, r);
        }
    }

    /**
     * 合併，合併兩個已排序數組
     * @param A
     * @param p
     * @param q
     * @param r
     */
    private static void merge(int[] A, int p, int q, int r) {
        int n1 = q - p + 1, n2 = r - q, i, j;
        int[] L = new int[n1 + 1], R = new int[n2 + 1];
        for(i=0 ; i<n1 ; i++) {
            L[i] = A[p + i];
        }
        for(j=0 ; j<n2 ; j++) {
            R[j] = A[q + j + 1];
        }
        L[n1] = R[n2] = Integer.MAX_VALUE;
        i = j = 0;
        for(int k=p ; k <= r ; k++) {
            A[k] = (L[i] <= R[j]) ? L[i++] : R[j++];
        }
    }
}
