package leetcode.editor.cn;


import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class P205IsomorphicStrings {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean isIsomorphic(String s, String t) {
            return Arrays.equals(transform(s), transform(t));
        }

        private int[] transform(String s) {
            Map<Character, Integer> map = new HashMap<>();
            int id = 0;
            int n = s.length();
            int[] res = new int[n];
            for (int i = 0; i < n; i++) {
                char c = s.charAt(i);
                if(map.containsKey(c)) res[i] = map.get(c);
                else map.put(c, (res[i] = id++));
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
