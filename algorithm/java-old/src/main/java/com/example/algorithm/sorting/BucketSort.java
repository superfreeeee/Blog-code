package com.example.algorithm.sorting;

/**
 * 桶排序
 * 限定條件：元素均勻分布於 [0, 1)
 * 時間複雜度：O(n^2)
 * (不)穩定的
 */
public class BucketSort {

    /**
     * 主接口，也是方法主體
     * 將每個元素插入到對應的桶中
     * @param A
     * @return
     */
    public static double[] sort(double[] A) {
        int n = A.length;
        Bucket[] B = new Bucket[n];
        for(int i=0 ; i<n ; i++) {
            int p = (int)Math.floor(n * A[i]);
            insert(B, p, A[i]);
        }
        return combine(B);
    }

    /**
     * 將元素插入到桶中
     * @param B
     * @param p
     * @param val
     */
    private static void insert(Bucket[] B, int p, double val) {
        Bucket tail = new Bucket(val);
        if(B[p] == null || B[p].val >= val) {
            tail.next = B[p];
            B[p] = tail;
        } else {
            Bucket b = B[p];
            while(b.next != null && b.next.val < val) {
                b = b.next;
            }
            tail.next = b.next;
            b.next = tail;
        }
    }

    /**
     * 合併所有桶
     * @param B
     * @return
     */
    private static double[] combine(Bucket[] B) {
        double[] A = new double[B.length];
        int i = 0;
        for(Bucket b : B) {
            while(b != null) {
                A[i++] = b.val;
                b = b.next;
            }
        }
        return A;
    }

    /**
     * 桶節點類
     */
    private static final class Bucket {
        double val;
        Bucket next;
        Bucket(double val) {
            this.val = val;
        }
    }
}
