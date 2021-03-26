package algorithm.sorting;

/**
 * 归并排序
 */
public class MergeSort {

    /**
     * 主方法，起始区间 [0, A.length - 1]
     * @param A
     */
    public static void sort(int[] A) {
        sort(A, 0, A.length - 1);
    }

    /**
     * 对闭区间 [l, r] 进行排序
     * 若 l = r，长度为一，结束排序
     * 否则 m = (l + r) / 2
     *     分成两个区间 [l, m], [m + 1, r]，分别归并后再合并
     * @param A
     * @param l
     * @param r
     */
    private static void sort(int[] A, int l, int r) {
        if (l == r) return;
        int m = (l + r) / 2;
        sort(A, l, m);
        sort(A, m + 1, r);
        merge(A, l, m, r);
    }

    /**
     * 合并两个排序后的子数组
     * @param A
     * @param l
     * @param m
     * @param r
     */
    private static void merge(int[] A, int l, int m, int r) {
        int lenL = m - l + 1, lenR = r - m, i, j;
        int[] L = new int[lenL + 1];
        int[] R = new int[lenR + 1];
        for(i=0 ; i<lenL ; i++) L[i] = A[l + i];
        for(j=0 ; j<lenR ; j++) R[j] = A[m + j + 1];
        L[lenL] = R[lenR] = Integer.MAX_VALUE;
        i = j = 0;
        for(int k=l ; k<=r ; k++) {
            A[k] = L[i] <= R[j] ? L[i++] : R[j++];
        }
    }
}
