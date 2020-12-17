package leetcode.editor.cn;

public class P338CountingBits {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] countBits(int num) {
            int[] res = new int[num + 1];
            res[0] = 0;
            int b = 1;
            while (b <= num) {
                for (int i = 0; i + b <= num && i < b ; i++) {
                    res[i + b] = res[i] + 1;
                }
                b <<= 1;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}