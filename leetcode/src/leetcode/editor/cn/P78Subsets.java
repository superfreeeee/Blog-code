package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P78Subsets {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private List<List<Integer>> res;

        public List<List<Integer>> subsets(int[] nums) {
            res = new ArrayList<>();
            res.add(new ArrayList<>());
//            System.out.println(res);
            for(int num : nums) {
                List<List<Integer>> other = new ArrayList<>();
                for(List<Integer> pos : res) {
                    other.add(new ArrayList<>(pos));
                    pos.add(num);
                    other.add(new ArrayList<>(pos));
                }
                res = other;
//                System.out.println(res);
            }

            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}