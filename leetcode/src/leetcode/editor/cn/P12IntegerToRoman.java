package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P12IntegerToRoman {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        private StringBuilder res;

        public String intToRoman(int num) {
            res = new StringBuilder();
            int[] vals = new int[]{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
            String[] ss = new String[]{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
            for(int i=0 ; i<13 ; i++) {
                num = transform(num ,vals[i], ss[i]);
            }
            return res.toString();
        }

        private int transform(int num, int val, String s) {
            if(num >= val) {
                int count = num / val, n = count;
                while (count-- > 0) res.append(s);
                num -= n * val;
            }
            return num;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}