package leetcode.editor.cn;

import java.util.Arrays;

public class P1137NThTribonacciNumber {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int tribonacci(int n) {
            int[] res = new int[]{0, 1, 1};
            if (n <= 2) return res[n];
            for (int i = 2; i < n; i++) {
                int next = res[0] + res[1] + res[2];
                res[0] = res[1];
                res[1] = res[2];
                res[2] = next;
//            System.out.println(Arrays.toString(res));
            }
            return res[2];
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}