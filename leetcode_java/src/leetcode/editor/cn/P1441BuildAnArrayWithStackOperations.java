package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P1441BuildAnArrayWithStackOperations {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        private String PUSH = "Push", POP = "Pop";

        public List<String> buildArray(int[] target, int n) {
            List<String> res = new ArrayList<>();
            int cur = 1;
            for(int t : target) {
                while(cur < t) {
                    res.add(PUSH);
                    res.add(POP);
                    cur++;
                }
                res.add(PUSH);
                cur++;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
