package leetcode.editor.cn;

public class P693BinaryNumberWithAlternatingBits {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean hasAlternatingBits(int n) {
            int b = n % 2;
            n >>>= 1;
            while (n > 0) {
                if ((b ^ (n % 2)) == 0) return false;
                b ^= 1;
                n >>>= 1;
            }
            return true;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}