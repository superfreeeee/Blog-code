package leetcode.editor.cn;

public class P136SingleNumber {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int singleNumber(int[] nums) {
            int n = 0;
            for (int num : nums) n ^= num;
            return n;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}