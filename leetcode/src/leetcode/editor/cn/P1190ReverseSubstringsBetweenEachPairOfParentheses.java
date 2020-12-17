package leetcode.editor.cn;

import java.util.Stack;

public class P1190ReverseSubstringsBetweenEachPairOfParentheses {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String reverseParentheses(String s) {
        Stack<String> ctx = new Stack<>();
        String res = "";
        for(char c : s.toCharArray()) {
            if(c == '(') {
                ctx.push(res);
                res = "";
            } else if(c == ')') {
                res = ctx.pop() + new StringBuilder(res).reverse().toString();
            } else {
                res += c;
            }
//            System.out.println(res);
//            System.out.println(ctx);
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
