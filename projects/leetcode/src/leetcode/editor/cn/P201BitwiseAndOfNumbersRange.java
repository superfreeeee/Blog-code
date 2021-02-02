package leetcode.editor.cn;

public class P201BitwiseAndOfNumbersRange {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int rangeBitwiseAnd(int m, int n) {
            while (m < n) {
                n &= n - 1;
            }
            return n;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}