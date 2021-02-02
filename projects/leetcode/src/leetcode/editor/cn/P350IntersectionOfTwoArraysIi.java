package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P350IntersectionOfTwoArraysIi {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private Map<Integer, Integer> counter = new HashMap<>();
        private Map<Integer, Integer> result = new HashMap<>();

        public int[] intersect(int[] nums1, int[] nums2) {
            int count = 0;
            for (int n : nums1) counter.put(n, counter.getOrDefault(n, 0) + 1);
            for (int n : nums2) {
                if (counter.getOrDefault(n, 0) > 0) {
                    result.put(n, result.getOrDefault(n, 0) + 1);
                    counter.put(n, counter.get(n) - 1);
                    count++;
                }
            }
            int[] res = new int[count];
            int index = 0;
            for(int key : result.keySet()) {
                int i = result.get(key);
                while(i-- > 0) res[index++] = key;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}