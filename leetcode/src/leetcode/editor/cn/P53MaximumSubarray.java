package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Stack;

public class P53MaximumSubarray {
    public static void main(String[] args) {
        System.out.println(new P53MaximumSubarray().new Solution().maxSubArray(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int maxSubArray(int[] nums) {
            return getSum(nums, 0, nums.length - 1).mSum;
        }

        private Sum getSum(int[] nums, int l, int r) {
            if (l == r) return new Sum(nums[l], nums[l], nums[l], nums[l]);
            int m = (l + r) >> 1;
            return merge(getSum(nums, l, m), getSum(nums, m + 1, r));
        }

        private Sum merge(Sum L, Sum R) {
            return new Sum(
                    L.iSum + R.iSum,
                    Math.max(L.lSum, L.iSum + R.lSum),
                    Math.max(R.rSum, R.iSum + L.rSum),
                    Math.max(Math.max(L.mSum, R.mSum), L.rSum + R.lSum)
            );
        }

        class Sum {
            int iSum;
            int lSum;
            int rSum;
            int mSum;

            public Sum(int iSum, int lSum, int rSum, int mSum) {
                this.iSum = iSum;
                this.lSum = lSum;
                this.rSum = rSum;
                this.mSum = mSum;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}