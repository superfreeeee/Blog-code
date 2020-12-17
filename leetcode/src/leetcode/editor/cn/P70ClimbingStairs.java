package leetcode.editor.cn;

public class P70ClimbingStairs {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int climbStairs(int n) {
            if (n == 1) return 1;
            int[] steps = new int[n];
            steps[0] = 1;
            steps[1] = 2;
            for (int i = 2; i < n; i++) {
                steps[i] = steps[i - 1] + steps[i - 2];
            }
            return steps[n - 1];
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}