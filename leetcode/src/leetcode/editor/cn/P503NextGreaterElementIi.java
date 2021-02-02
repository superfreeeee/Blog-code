package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Stack;

public class P503NextGreaterElementIi {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int[] t = new int[nums.length * 2];
        for(int i=0 ; i<t.length ; i++) {
            t[i] = nums[i % nums.length];
        }
        System.out.println(Arrays.toString(nums));
        System.out.println(Arrays.toString(t));

        Stack<Integer> stack = new Stack<>();
        int[] res = new int[t.length];
        for(int i=t.length-1 ; i>=0 ; i--) {
            while(!stack.empty() && stack.peek() <= t[i]) {
                stack.pop();
            }
            res[i] = stack.empty() ? -1 : stack.peek();
            stack.push(t[i]);
        }

        System.out.println(Arrays.toString(res));

        int[] ans = new int[nums.length];
        for(int i=0 ; i<ans.length ; i++) {
            ans[i] = res[i];
        }
        return ans;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
