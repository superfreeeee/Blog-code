package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class P1002FindCommonCharacters {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private Map<Character, Integer> result = null;

        public List<String> commonChars(String[] A) {
            for (String a : A) {
                Map<Character, Integer> tmp = new HashMap<>();
                for (char c : a.toCharArray()) {
                    if (result == null || result.getOrDefault(c, 0) > 0) {
                        tmp.put(c, tmp.getOrDefault(c, 0) + 1);
                        if (result != null) result.put(c, result.get(c) - 1);
                    }
                }
                result = tmp;
                System.out.println(result);
            }
            List<String> res = new ArrayList<>();
            for(Character c : result.keySet()) {
                int count = result.get(c);
                while(count-- > 0) res.add(String.valueOf(c));
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}