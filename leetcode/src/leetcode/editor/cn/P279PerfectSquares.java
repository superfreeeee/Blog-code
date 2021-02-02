package leetcode.editor.cn;

import java.util.Arrays;

public class P279PerfectSquares {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int numSquares(int n) {
            int[] res = new int[n + 1];
            int i = 1;
            while (i * i <= n) {
                res[i * i] = 1;
                i++;
            }
            for (int cur = 2; cur <= n; cur++) {
                if (res[cur] == 1) continue;
                
            }
            System.out.println(Arrays.toString(res));
            return 0;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}