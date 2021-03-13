package leetcode.editor.cn;

import java.util.Stack;

public class P1249MinimumRemoveToMakeValidParentheses {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String minRemoveToMakeValid(String s) {
            Stack<String> ctx = new Stack<>();
            String cur = "";
            for (char c : s.toCharArray()) {
                if (c == '(') {
                    ctx.push(cur);
                    cur = "";
                } else if (c == ')') {
                    if (!ctx.isEmpty()) {
                        cur = ctx.pop() + "(" + cur + ")";
                    }
                } else {
                    cur += c;
                }
//                System.out.println("--" + cur + "--");
//                System.out.println(ctx);
//                System.out.println(ctx.size());
            }
            while (!ctx.isEmpty()) {
                cur = ctx.pop() + cur;
//                System.out.println("--" + cur + "--");
//                System.out.println(ctx);
            }
            return cur;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
