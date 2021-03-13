package leetcode.editor.cn;

import java.util.Arrays;

public class P264UglyNumberIi {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private int[] res;

        public int nthUglyNumber(int n) {
            res = new int[n];
            res[0] = 1;
            int p2 = 0, p3 = 0, p5 = 0;
            for (int i = 1; i < n; i++) {
                int next2 = res[p2] * 2, next3 = res[p3] * 3, next5 = res[p5] * 5;
                if (next2 <= next3 && next2 <= next5) {
                    res[i] = next2;
                } else if (next3 <= next5) {
                    res[i] = next3;
                } else {
                    res[i] = next5;
                }
                if (next2 == res[i]) p2++;
                if (next3 == res[i]) p3++;
                if (next5 == res[i]) p5++;
            }
//            System.out.println(Arrays.toString(res));
            return res[n - 1];
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}