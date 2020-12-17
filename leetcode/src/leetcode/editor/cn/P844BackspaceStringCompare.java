package leetcode.editor.cn;

import java.util.Stack;

public class P844BackspaceStringCompare {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean backspaceCompare(String S, String T) {
            String s = solve(S);
            String t = solve(T);
            return s.equals(t);
        }

        private String solve(String s) {
            Stack<Character> stack = new Stack<>();
            for(char c : s.toCharArray()) {
                if(c == '#') {
                    if(!stack.empty()) {
                        stack.pop();
                    }
                } else {
                    stack.push(c);
                }
            }
            StringBuilder res = new StringBuilder();
            while(stack.size() > 0) {
                res.append(stack.pop());
            }
            return res.reverse().toString();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
