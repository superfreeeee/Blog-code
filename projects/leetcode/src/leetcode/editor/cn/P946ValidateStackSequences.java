package leetcode.editor.cn;

import java.util.Stack;

public class P946ValidateStackSequences {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        int n = pushed.length;
        Stack<Integer> stack = new Stack<>();
        int j = 0;
        for(int i=0 ; i<n ; i++) {
            stack.push(pushed[i]);
            while(!stack.empty() && j < n && stack.peek() == popped[j]) {
                stack.pop();
                j++;
            }
        }
        return stack.empty() && j == n;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
