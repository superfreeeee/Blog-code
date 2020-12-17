package sorting;

/**
 * 堆排序
 */
public class HeapSort {

    /**
     * 主方法
     *
     * @param A
     */
    public static void sort(int[] A) {
        // 建最大堆
        for (int i = parent(A.length - 1); i >= 0; i--) {
            maxHeapify(A, A.length, i);
        }
        for (int i = 0; i < A.length; i++) {
            // 抽取最大值并恢复堆
            swap(A, 0, A.length - i - 1);
            maxHeapify(A, A.length - i - 1, 0);
        }
    }

    /**
     * 将指定下标的数下降到适当的位置
     *
     * @param A
     * @param len
     * @param pos
     */
    private static void maxHeapify(int[] A, int len, int pos) {
        if (left(pos) >= len) return;
        int max = pos;
        if (A[max] <= A[left(pos)]) max = left(pos);
        if (right(pos) < len && A[max] <= A[right(pos)]) max = right(pos);
        if (max != pos) {
            swap(A, pos, max);
            maxHeapify(A, len, max);
        }
    }

    /**
     * 交换
     *
     * @param A
     * @param i
     * @param j
     */
    private static void swap(int[] A, int i, int j) {
        int tmp = A[i];
        A[i] = A[j];
        A[j] = tmp;
    }

    /**
     * 父节点下标
     *
     * @param pos
     * @return
     */
    private static int parent(int pos) {
        return (pos - 1) / 2;
    }

    /**
     * 左子节点下标
     *
     * @param pos
     * @return
     */
    private static int left(int pos) {
        return pos * 2 + 1;
    }

    /**
     * 右子节点下标
     *
     * @param pos
     * @return
     */
    private static int right(int pos) {
        return pos * 2 + 2;
    }

}
