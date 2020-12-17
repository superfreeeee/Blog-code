package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P456One32Pattern {
    public static void main(String[] args) {
        Solution solution = new P456One32Pattern().new Solution();
        System.out.println(solution.find132pattern(new int[]{1,2,3,4}));
        System.out.println(solution.find132pattern(new int[]{3,1,4,2}));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean find132pattern(int[] nums) {
            for (int i = 0; i < nums.length - 2; i++) {
                int next = Integer.MIN_VALUE;
                for(int j=i+1 ; j<nums.length ; j++) {
                    if(nums[j] > nums[i]) {
                        if(next > nums[j]) {
                            return true;
                        }
                        next = nums[j];
                    }
                }
            }
            return false;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
