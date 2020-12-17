package leetcode.editor.cn;

import java.util.Arrays;

public class P45JumpGameIi {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int jump(int[] nums) {
            int n = nums.length;
            int[] res = new int[n];
            int top = 0;
            for (int i = 0; i < n - 1; i++) {
                int count = nums[i];
                while (top < i + count) {
                    res[++top] = res[i] + 1;
//                    System.out.println(i + " " + Arrays.toString(res));
                    if (top == n - 1) return res[top];
                }
            }
            return res[top];
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}