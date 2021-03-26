package algorithm.sorting;

/**
 * 插入排序
 */
public class InsertionSort {

    /**
     * 主方法
     * @param A
     */
    public static void sort(int[] A) {
        for(int i=1 ; i < A.length ; i++) {
            int num = A[i];
            int p = i - 1;
            while(p >= 0 && A[p] > num) {
                A[p + 1] = A[p];
                p--;
            }
            A[p + 1] = num;
        }
    }
}
