package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P220ContainsDuplicateIii {
    public static void main(String[] args) {
        System.out.println(Integer.MIN_VALUE - Integer.MAX_VALUE);
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
            if (t < 0) return false;
            long w = (long) t + 1;
            Map<Long, Long> buckets = new HashMap<>();
            for (int i = 0; i < nums.length; i++) {
                long m = getID(nums[i], w);
                if (buckets.containsKey(m) ||
                        buckets.containsKey(m - 1) && Math.abs(buckets.get(m - 1) - nums[i]) < w ||
                        buckets.containsKey(m + 1) && Math.abs(buckets.get(m + 1) - nums[i]) < w
                ) return true;
                buckets.put(m, (long) nums[i]);
                if (i >= k) buckets.remove(getID(nums[i - k], w));
            }
            return false;
        }

        private long getID(long x, long w) {
            return x < 0 ? (x + 1) / w - 1 : x / w;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}