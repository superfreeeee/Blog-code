package leetcode.editor.cn;

import java.util.*;
import java.util.stream.Collectors;

public class P315CountOfSmallerNumbersAfterSelf {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private int[] a;
        private int[] c;

        public List<Integer> countSmaller(int[] nums) {
            init(nums);
            int[] res = new int[nums.length];
            for (int i = nums.length - 1; i >= 0; i--) {
                int pos = getID(nums[i]);
                res[i] = c[pos];
                update(pos);
//                System.out.println(Arrays.toString(a));
//                System.out.println(Arrays.toString(c));
//                System.out.println(Arrays.toString(res));
            }
            return Arrays.stream(res).boxed().collect(Collectors.toList());
        }

        private void update(int pos) {
            for (int i = pos + 1; i < c.length; i++) c[i]++;
        }

        private void init(int[] nums) {
            Set<Integer> set = new HashSet<>();
            for (int num : nums) set.add(num);
            a = new int[set.size()];
            int index = 0;
            for (int num : set) a[index++] = num;
            Arrays.sort(a);

            c = new int[a.length];
            Arrays.fill(c, 0);
        }

        private int getID(int num) {
            return Arrays.binarySearch(a, num);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}