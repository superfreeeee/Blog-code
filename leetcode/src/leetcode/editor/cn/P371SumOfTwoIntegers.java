package leetcode.editor.cn;

import java.util.Arrays;

public class P371SumOfTwoIntegers {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public int getSum(int a, int b) {
            return (a & b) == 0 ? a | b : getSum(a ^ b, (a & b) << 1);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}