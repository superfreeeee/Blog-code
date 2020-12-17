package leetcode.editor.cn;

import java.util.Arrays;

public class P215KthLargestElementInAnArray {
    public static void main(String[] args) {
        System.out.println(-1 / 2);
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int findKthLargest(int[] nums, int k) {
            buildMaxHeap(nums);
//            System.out.println(Arrays.toString(nums));
            int len = nums.length;
            while (--k > 0) shift(nums, len--);
            return nums[0];
        }

        private void shift(int[] nums, int len) {
//            System.out.println(len);
            swap(nums, 0, --len);
            if (len == 1) return;
            int cur = 0, last = parent(len - 1), other;
            while (cur <= last) {
//                System.out.println("cur = " + cur);
                if (right(cur) < len && nums[left(cur)] < nums[right(cur)]) other = right(cur);
                else other = left(cur);
                if(nums[cur] > nums[other]) break;
                swap(nums, cur, other);
                cur = other;
            }
//            System.out.println(Arrays.toString(nums));
        }

        private void buildMaxHeap(int[] nums) {
            for (int i = 1; i < nums.length; i++) {
                int cur = i;
                while (nums[parent(cur)] < nums[cur]) {
                    swap(nums, parent(cur), cur);
                    cur = parent(cur);
                }
            }
        }

        private int parent(int i) {
            return (i - 1) / 2;
        }

        private int left(int i) {
            return 2 * i + 1;
        }

        private int right(int i) {
            return 2 * i + 2;
        }

        private void swap(int[] a, int i, int j) {
            int tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}