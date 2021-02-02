package leetcode.editor.cn;

import java.util.Arrays;

public class P393Utf8Validation {
    public static void main(String[] args) {
        System.out.println(new P393Utf8Validation().new Solution().validUtf8(new int[]{}));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean validUtf8(int[] data) {
            int cur = 0;
            while (true) {
                if (cur > data.length) return false;
                if (cur == data.length) return true;
                int i = 0;
                if (data[cur] >>> 3 == 30) i = 3;
                else if (data[cur] >>> 4 == 14) i = 2;
                else if (data[cur] >>> 5 == 6) i = 1;
                else if (data[cur] >>> 7 == 0) i = 0;
                else return false;
                while (i-- > 0) {
                    if (++cur >= data.length || data[cur] >>> 6 != 2) return false;
                }
                cur++;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}