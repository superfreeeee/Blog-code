package sorting;

/**
 * 选择第 k 小的数
 */
public class SelectionKth {
    public static int select(int[] A, int k) {
        return select(A.clone(), 0, A.length - 1, k - 1);
    }

    private static int select(int[] A, int l, int r, int k) {
        int pivot = A[r];
        int i = l - 1;
        for (int j = l; j < r; j++) {
            if (A[j] <= pivot) {
                int tmp = A[++i];
                A[i] = A[j];
                A[j] = tmp;
            }
        }
        A[r] = A[i + 1];
        A[i + 1] = pivot;
        if (i + 1 == k) return pivot;
        else if (i + 1 < k) return select(A, i + 2, r, k);
        else return select(A, l, i, k);
    }
}
