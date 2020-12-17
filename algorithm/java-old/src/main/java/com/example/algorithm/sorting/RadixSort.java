package com.example.algorithm.sorting;

/**
 * 基數排序
 * 時間複雜度：O(d * (k + n))
 * 穩定的
 */
public class RadixSort {

    /**
     * 排序對外接口
     * @param A
     * @param base
     * @return
     */
    public static int[] sort(int[] A, int base) {
        int d = maxPos(A, base);
        int[] B = A.clone();
        sort(B, base, d);
        return B;
    }

    /**
     * 排序主方法
     * 將每個數分解成 d 位，從低位到高位進行穩定排序
     * @param A
     * @param base
     * @param d
     */
    private static void sort(int[] A, int base, int d) {
        int[] C, B = new int[A.length];
        int ground = 1;
        while(d > 0) {
            C = new int[base];
            for(int a : A) {
                C[a / ground % base]++;
            }
            for(int i=1 ; i<base ; i++) {
                C[i] += C[i-1];
            }
            for(int i=A.length-1 ; i >= 0 ; i--) {
                int p = A[i] / ground % base;
                C[p]--;
                B[C[p]] = A[i];
            }
            for(int i=0 ; i<A.length ; i++) {
                A[i] = B[i];
            }
            d--;
            ground *= base;
        }
    }

    /**
     * 找出數組的最大位數
     * @param A
     * @param base
     * @return
     */
    private static int maxPos(int[] A, int base) {
        int m = OrderStatistics.maximum(A);
        int d = 0;
        while(m > 0) {
            d++;
            m /= base;
        }
        return d;
    }

}
