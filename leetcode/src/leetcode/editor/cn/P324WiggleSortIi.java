package leetcode.editor.cn;

import java.util.Arrays;

public class P324WiggleSortIi {
    public static void main(String[] args) {
        System.out.println(new P324WiggleSortIi().new Solution().quickSelect(new int[]{3, 1, 4, 2, 7}, 0, 4));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private int n = -1;

        public void wiggleSort(int[] nums) {
            int midIndex = quickSelect(nums, 0, nums.length - 1);
            int mid = nums[midIndex];
            n = nums.length;
            for (int i = 0, j = 0, k = n - 1; j <= k; ) {
                if (nums[V(j)] > mid) {
                    swap(nums, V(i++), V(j++));
                } else if (nums[V(j)] < mid) {
                    swap(nums, V(k--), V(j));
                } else {
                    j++;
                }
            }
        }

        private int V(int i) {
            return (2 * i + 1) % (n | 1);
        }

        private void swap(int[] nums, int i, int j) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
        }

        private int quickSelect(int[] nums, int L, int R) {
            int pivot = nums[L];
            int l = L, r = R;
            while (l < r) {
                while (l < r && nums[r] >= pivot) r--;
                if (l < r) nums[l++] = nums[r];
                while (l < r && nums[l] <= pivot) l++;
                if (l < r) nums[r--] = nums[l];
            }
            nums[l] = pivot;
//            System.out.println(Arrays.toString(nums));
            if (l == nums.length / 2) return l;
            else if (l < nums.length / 2) return quickSelect(nums, l + 1, R);
            else return quickSelect(nums, L, l - 1);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}