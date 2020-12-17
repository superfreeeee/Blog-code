package leetcode.editor.cn;

public class P268MissingNumber {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public int missingNumber(int[] nums) {
            int n = nums.length, res = n, idx = 0;
            for (int num : nums) res = res ^ (idx++) ^ num;
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)
}