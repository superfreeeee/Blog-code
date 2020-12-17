package leetcode.editor.cn;

import java.util.Arrays;

public class P164MaximumGap {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int maximumGap(int[] nums) {
        if(nums.length < 2) return 0;
        Arrays.sort(nums);
        int ans = 0;
        for(int i=1 ; i<nums.length ; i++) {
            if(nums[i] - nums[i - 1] > ans) {
                ans = nums[i] - nums[i - 1];
            }
        }
        return ans;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}