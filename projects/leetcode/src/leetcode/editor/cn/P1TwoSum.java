package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P1TwoSum {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] twoSum(int[] nums, int target) {
            Map<Integer, Integer> numToIndex = new HashMap<>();
            for(int i=0 ; i<nums.length ; i++) {
                if(numToIndex.containsKey(target - nums[i])) {
                    return new int[]{numToIndex.get(target - nums[i]), i};
                }
                numToIndex.put(nums[i], i);
            }
            return new int[]{};
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
