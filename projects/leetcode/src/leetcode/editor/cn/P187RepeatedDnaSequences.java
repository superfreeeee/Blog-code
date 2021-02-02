package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class P187RepeatedDnaSequences {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private Map<String, Integer> map;

        public List<String> findRepeatedDnaSequences(String s) {
            map = new HashMap<>();
            for (int i = 0, endi = s.length() - 9; i < endi; i++) {
                String sub = s.substring(i, i + 10);
                map.put(sub, map.getOrDefault(sub, 0) + 1);
            }
            List<String> res = new ArrayList<>();
            for (String key : map.keySet()) {
                if (map.get(key) > 1) res.add(key);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}