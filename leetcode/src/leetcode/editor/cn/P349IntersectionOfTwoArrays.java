package leetcode.editor.cn;

import java.util.HashSet;
import java.util.Set;

public class P349IntersectionOfTwoArrays {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] intersection(int[] nums1, int[] nums2) {
            Set<Integer> set = new HashSet<>();
            for (int num : nums1) set.add(num);
            Set<Integer> set2 = new HashSet<>();
            for (int num : nums2) if (set.contains(num)) set2.add(num);
            return set2.stream().mapToInt(Integer::valueOf).toArray();
        }

//        public int[] intersection(int[] nums1, int[] nums2) {
//            Set<Integer> set = new HashSet<Integer>(intArray2List(nums1));
//            set.retainAll(intArray2List(nums2));
//            return set.stream().mapToInt(Integer::valueOf).toArray();
//        }
//
//        private List<Integer> intArray2List(int[] a) {
//            return Arrays.stream(a).boxed().collect(Collectors.toList());
//        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}