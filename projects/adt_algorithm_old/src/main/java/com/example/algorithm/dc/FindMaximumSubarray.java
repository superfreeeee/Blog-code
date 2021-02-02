package com.example.algorithm.dc;

/**
 * 分治策略：查找最大子串
 * 問題描述：
 *     查找最大連續子數組，其和為最大
 */
public class FindMaximumSubarray {

    public static int[] find(int[] A) {
        return find(A, 0, A.length - 1);
    }

    private static int[] find(int[] A, int low, int high) {
        if(low == high) {
            return new int[]{low, high, A[0]};
        }
        int mid = (low + high) / 2;
        int[] left = find(A, low, mid);
        int[] right = find(A, mid + 1, high);
        int[] cross = findCross(A, low, mid, high);
        if (left[2] >= right[2] && left[2] >= cross[2]) {
            return left;
        } else if (right[2] >= left[2] && right[2] >= cross[2]) {
            return right;
        } else {
            return cross;
        }
    }

    private static int[] findCross(int[] A, int low, int mid, int high) {
        int sum = 0;
        int leftSum = Integer.MIN_VALUE, left = mid;
        for(int i=mid ; i>= 0 ; i--) {
            sum += A[i];
            if(sum > leftSum) {
                leftSum = sum;
                left = i;
            }
        }
        sum = 0;
        int rightSum = Integer.MIN_VALUE, right = mid + 1;
        for(int i = mid + 1 ; i<= high ; i++) {
            sum += A[i];
            if(sum > rightSum) {
                rightSum = sum;
                right = i;
            }
        }
        return new int[]{left, right, leftSum + rightSum};
    }

}
