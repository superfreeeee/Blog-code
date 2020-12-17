package leetcode.editor.cn;

import java.util.LinkedList;

public class P224BasicCalculator {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public int calculate(String s) {
            s = s.replace(" ", "");
            LinkedList<Integer> stack = new LinkedList<>();
            int res = 0, operand = 0, sign = 1;
            for(char c : s.toCharArray()) {
//            System.out.println("token: " + c);
                switch (c) {
                    case '+':
                        res += sign * operand;
                        sign = 1;
                        operand = 0;
                        break;
                    case '-':
                        res += sign * operand;
                        sign = -1;
                        operand = 0;
                        break;
                    case '(':
                        stack.addFirst(res);
                        stack.addFirst(sign);
                        res = 0;
                        sign = 1;
                        break;
                    case ')':
                        res += sign * operand;
                        res *= stack.pollFirst();
                        res += stack.pollFirst();
                        operand = 0;
                        break;
                    default:
                        operand = operand * 10 + (c - '0');
                }
//            System.out.println("res: " + res);
//            System.out.println("sign: " + sign);
//            System.out.println("operand: " + operand);
            }
            res += sign * operand;

            return res;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
