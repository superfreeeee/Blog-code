package leetcode.editor.cn;

public class P260SingleNumberIii {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] singleNumber(int[] nums) {
            int n = 0;
            for (int num : nums) n ^= num;
            int d = n & (-n), x = 0;
            for (int num : nums) if ((num & d) != 0) x ^= num;
            return new int[]{x, n ^ x};
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}