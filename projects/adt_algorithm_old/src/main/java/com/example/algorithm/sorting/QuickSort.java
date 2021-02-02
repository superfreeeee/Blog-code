package com.example.algorithm.sorting;

/**
 * 快速排序（附帶隨機化方法）
 * 時間複雜度：O(nlgn), 最壞 O(n^2) 幾乎不出現 / 隨機化：O()
 * 不穩定的
 */
public class QuickSort {

    /**
     * 排序對外接口
     * @param A 待排序數組
     * @param randomized 是否選用隨機化方法
     * @return
     */
    public static int[] sort(int[] A, boolean randomized) {
        int[] B = A.clone();
        if(randomized) {
            randomizedSort(B, 0, B.length - 1);
        } else {
            sort(B, 0, B.length - 1);
        }
        return B;
    }

    /**
     * 排序主方法
     * 使用 partition 得到主元位置，依據主元分成左右兩部分，遞歸求解
     * @param A
     * @param p
     * @param r
     */
    private static void sort(int[] A, int p, int r) {
        if(p < r) {
            int q = partition(A, p, r);
            sort(A, p, q - 1);
            sort(A, q + 1, r);
        }
    }

    /**
     * 劃分數組，分成兩步驟：
     * 1. 選定主元(pivot)，非隨機化方法直接選用最後一位 r 的值
     * 2. 令 i 指向第一部分(小於等於主元)的最後一位、
     *    令 j 指向第二部分(大於主元)的後一位
     *    最後將主元與 j 的最左側元素交換，完成分裂
     * @param A
     * @param p
     * @param r
     * @return
     */
    private static int partition(int[] A, int p, int r) {
        int x = A[r], i = p - 1;
        for(int j=p ; j <= r-1 ; j++) {
            if(A[j] <= x) {
                exchange(A, ++i, j);
            }
        }
        exchange(A, ++i, r);
        return i;
    }

    private static void exchange(int[] A, int i, int j) {
        int tmp = A[i];
        A[i] = A[j];
        A[j] = tmp;
    }

    /**
     * 隨機化快排的主方法，主要差異在於隨機化的分治策略(randomized-partition)
     * @param A
     * @param p
     * @param r
     */
    private static void randomizedSort(int[] A, int p, int r) {
        if(p < r) {
            int q = randomizedPartition(A, p, r);
            randomizedSort(A, p, q - 1);
            randomizedSort(A, q + 1, r);
        }
    }

    /**
     * 隨機化版本的劃分數組，從 p ~ r 隨機選擇一個作為主元，交換到 r 位後執行普通的劃分即可
     * @param A
     * @param p
     * @param r
     * @return
     */
    private static int randomizedPartition(int[] A, int p, int r) {
        int i = (int)Math.floor(Math.random() * (r - p)) + p;
        exchange(A, i, r);
        return partition(A, p, r);
    }

}
