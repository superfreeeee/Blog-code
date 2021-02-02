package leetcode.editor.cn;

public class P342PowerOfFour {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean isPowerOfFour(int num) {
            if (num <= 0) return false;
            while (num > 1) {
                if (num % 4 != 0) return false;
                num /= 4;
            }
            return true;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}