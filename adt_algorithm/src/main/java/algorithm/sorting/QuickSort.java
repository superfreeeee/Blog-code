package algorithm.sorting;

/**
 * 快速排序
 */
public class QuickSort {

    /**
     * 主方法，起始区间 [0, A.length - 1]
     * @param A
     */
    public static void sort(int[] A) {
        sort(A, 0, A.length - 1);
    }

    /**
     * 对闭区间 [l, r] 排序
     * 若 l < r，则至少有两个数，则分成两堆后(返回中间下标)，对两边递归排序
     * @param A
     * @param l
     * @param r
     */
    private static void sort(int[] A, int l, int r) {
        if (l < r) {
            int m = partition(A, l, r);
            sort(A, l, m - 1);
            sort(A, m + 1, r);
        }
    }

    /**
     * 将区间分为两堆，先取最后一个数作 pivot
     * i 指向比 pivot 小的区间的末尾，i + 1 为两个区间的中间值
     * @param A
     * @param l
     * @param r
     * @return
     */
    private static int partition(int[] A, int l, int r) {
        int pivot = A[r];
        int i = l - 1;
        for (int j = l; j < r; j++) {
            if(A[j] <= pivot) {
                int tmp = A[++i];
                A[i] = A[j];
                A[j] = tmp;
            }
        }
        A[r] = A[i + 1];
        A[i + 1] = pivot;
        return i + 1;
    }

}
