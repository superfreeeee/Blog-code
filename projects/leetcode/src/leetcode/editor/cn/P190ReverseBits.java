package leetcode.editor.cn;

public class P190ReverseBits {
    public static void main(String[] args) {
        System.out.println(-1 >>> 1);
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    public class Solution {
        // you need treat n as an unsigned value
        public int reverseBits(int n) {
            int res = 0;
            for (int i = 0; i < 32; i++) {
                res = (res << 1) | (n & 1);
                n >>>= 1;
//                System.out.println(res + " " + n);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}