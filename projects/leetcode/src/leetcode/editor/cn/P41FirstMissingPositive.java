package leetcode.editor.cn;

import java.util.Arrays;

public class P41FirstMissingPositive {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int firstMissingPositive(int[] nums) {
            boolean[] found = new boolean[nums.length];
            for (int i = 0; i < nums.length; i++) {
                if (nums[i] >= 1 && nums[i] <= nums.length) {
                    if (!found[nums[i] - 1]) found[nums[i] - 1] = true;
                }
            }
//            System.out.println(Arrays.toString(found));
            for (int i = 0; i < nums.length; i++) {
                if (!found[i]) return i + 1;
            }
            return nums.length + 1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}