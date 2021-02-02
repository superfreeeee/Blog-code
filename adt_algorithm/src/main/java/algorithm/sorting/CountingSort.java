package algorithm.sorting;

/**
 * 计数排序
 */
public class CountingSort {

    /**
     * 排序主方法
     *
     * @param A 原数组
     * @param k 数组内容的区间 [0, k]
     * @return
     */
    public static int[] sort(int[] A, int k) {
        int[] counter = new int[k + 1]; // 闭区间 [0, k]
        for (int a : A) counter[a]++;
        for (int i = 1; i <= k; i++) {
            counter[i] = counter[i] + counter[i - 1];
        }
        int[] B = new int[A.length];
        for (int i = A.length - 1; i >= 0; i--) {
            B[--counter[A[i]]] = A[i];
        }
        return B;
    }
}
