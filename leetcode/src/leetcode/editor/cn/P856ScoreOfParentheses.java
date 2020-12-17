package leetcode.editor.cn;

import java.util.Stack;

public class P856ScoreOfParentheses {
    public static void main(String[] args) {
        System.out.println("(".equals("("));
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int scoreOfParentheses(String S) {
        Stack<String> stack = new Stack<>();
        for(char c : S.toCharArray()) {
            if(c == '(') {
                stack.push(""+c);
            } else {
                int sum = 0;
                while(!stack.empty() && !stack.peek().equals("(")) sum += Integer.parseInt(stack.pop());
                stack.pop();
                sum = sum == 0 ? 1 : sum * 2;
                stack.push(String.valueOf(sum));
            }
//            System.out.println(c);
//            System.out.println(stack);
        }
        int sum = 0;
        while(stack.size() > 0) {
            sum += Integer.parseInt(stack.pop());
        }
        return sum;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
