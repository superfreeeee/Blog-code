package leetcode.editor.cn;

public class P137SingleNumberIi {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int singleNumber(int[] nums) {
            int i = 0, j = 0;
            for (int num : nums) {
                i = ~j & (i ^ num);
                j = ~i & (j ^ num);
            }
            return i;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}