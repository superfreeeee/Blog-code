package leetcode.editor.cn;

import java.util.Stack;

public class P150EvaluateReversePolishNotation {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int evalRPN(String[] tokens) {
            Stack<Integer> stack = new Stack<>();
            for(String token : tokens) {
                if(token.matches("[-]?[0-9]+")) {
                    stack.push(Integer.parseInt(token));
                } else {
                    int b = stack.pop();
                    int a = stack.pop();
                    switch (token) {
                        case "+": stack.push(a + b); break;
                        case "-": stack.push(a - b); break;
                        case "*": stack.push(a * b); break;
                        case "/": stack.push(a / b); break;

                    }
                }
//            System.out.println(stack);
            }

            return stack.pop();
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
