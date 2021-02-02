package leetcode.editor.cn;

import java.util.*;

public class P66PlusOne {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] plusOne(int[] digits) {
            List<Integer> nums = new ArrayList<>();

            int carry = 1;
            for (int i = digits.length - 1; i >= 0; i--) {
                int next = digits[i] + carry;
                carry = next / 10;
                next %= 10;
                nums.add(next);
            }
            if(carry > 0) nums.add(carry);
            Collections.reverse(nums);
            return nums.stream().mapToInt(Integer::valueOf).toArray();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}