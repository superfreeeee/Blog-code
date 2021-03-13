package leetcode.editor.cn;

import java.util.*;

public class P218TheSkylineProblem {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public List<List<Integer>> getSkyline(int[][] buildings) {
            List<Integer> checkpoints = extractPoints(buildings);
            System.out.println(checkpoints);
            return null;
        }

        private List<Integer> extractPoints(int[][] b) {
            Set<Integer> nums = new TreeSet<>();
            for(int[] p : b) {
                nums.add(p[0]);
                nums.add(p[1]);
            }
            return new ArrayList<>(nums);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}