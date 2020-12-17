package leetcode.editor.cn;

import java.util.Stack;

public class P907SumOfSubarrayMinimums {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int sumSubarrayMins(int[] A) {
            int MOD = 1_000_000_007;
            int n = A.length;
            int sum = 0, dot = 0;
            Stack<Integer> nums = new Stack<>();
            Stack<Integer> counts = new Stack<>();
            for(int i=0 ; i<n ; i++) {
                int count = 1;
                while(!nums.isEmpty() && nums.peek() >= A[i]) {
                    int c = counts.pop();
                    count += c;
                    dot -= c * nums.pop();
                }
                nums.push(A[i]);
                counts.push(count);
                dot += A[i] * count;
                sum += dot;
                sum %= MOD;
            }
            return sum;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
