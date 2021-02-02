package leetcode.editor.cn;

public class P29DivideTwoIntegers {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int divide(int dividend, int divisor) {
            if(dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
            return dividend / divisor;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}