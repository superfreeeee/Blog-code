package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Collections;

public class P274HIndex {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int hIndex(int[] citations) {
            if(citations.length == 0) return 0;
            Integer[] nums = Arrays.stream(citations).boxed().toArray(Integer[]::new);
            Arrays.sort(nums, Collections.reverseOrder());
            int i = 0;
            while (i < nums.length) {
                if (nums[i] >= i + 1) i++;
                else break;
            }
            return i;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}