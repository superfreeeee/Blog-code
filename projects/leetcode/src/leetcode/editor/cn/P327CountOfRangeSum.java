package leetcode.editor.cn;

import java.util.Arrays;

public class P327CountOfRangeSum {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        private int ans = 0;
        private int lower, upper;

        public int countRangeSum(int[] nums, int lower, int upper) {
            if (nums.length == 0) return 0;
            this.lower = lower;
            this.upper = upper;
            check(nums, 0, nums.length - 1);
            return ans;
        }

        private long check(int[] nums, int l, int r) {
            long sum = 0;
            if (l == r) {
                sum = nums[l];
            } else {
                long L = 0, R = 0;
                for (int m = l + 1; m <= r; m++) {
                    L = check(nums, l, m);
                    R = check(nums, m + 1, r);
                }
                sum = L + R;
            }
            System.out.println(l + " " + r + " " + sum);
            if (lower <= sum && sum <= upper) {
                ans++;
            }
            return sum;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}