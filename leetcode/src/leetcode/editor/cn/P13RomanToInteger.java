package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P13RomanToInteger {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private Map<Character, Integer> mapper;

        public int romanToInt(String s) {
            init();
            int res = 0;
            for(int i=0 ; i<s.length() ; i++) {
                int val = mapper.get(s.charAt(i));
                res += i == s.length() - 1 || i < s.length() && val >= mapper.get(s.charAt(i + 1)) ? val : -val;
            }
            return res;
        }

        private void init() {
            mapper = new HashMap<>();
            char[] chars = new char[]{'I', 'V', 'X', 'L', 'C', 'D', 'M'};
            int[] vals = new int[]{1, 5, 10, 50, 100, 500, 1000};
            for (int i = 0; i < 7; i++) {
                mapper.put(chars[i], vals[i]);
            }
            System.out.println(mapper);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}