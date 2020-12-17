package leetcode.editor.cn;

import java.util.Stack;

public class P1544MakeTheStringGreat {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String makeGood(String s) {
            Stack<Character> stack = new Stack<>();
            int d = 'a' - 'A';
            for (char c : s.toCharArray()) {
                if (!stack.isEmpty() && Math.abs(c - stack.peek()) == d) stack.pop();
                else stack.push(c);
            }
            StringBuilder res = new StringBuilder();
            while(!stack.isEmpty()) {
                res.append(stack.pop());
            }
            return res.reverse().toString();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
