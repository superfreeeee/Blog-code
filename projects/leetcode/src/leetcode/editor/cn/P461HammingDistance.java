package leetcode.editor.cn;

public class P461HammingDistance {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int hammingDistance(int x, int y) {
            return Integer.bitCount(x ^ y);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}