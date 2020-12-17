package leetcode.editor.cn;

import java.util.Stack;

public class P682BaseballGame {
    public static void main(String[] args) {
        Solution solution = new P682BaseballGame().new Solution();
        System.out.println(solution.calPoints(new String[]{"5", "2", "C", "D", "+"}));
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int calPoints(String[] ops) {
        Stack<Integer> stack = new Stack<>();
//        stack.setSize(ops.length);
        for(String op : ops) {
            switch (op) {
                case "C":
                    stack.pop();
                    break;
                case "D":
                    int recent = stack.peek();
                    stack.push(recent * 2);
                    break;
                case "+":
                    int b = stack.pop();
                    int a = stack.peek();
                    stack.push(b);
                    stack.push(a + b);
                    break;
                default:
                    stack.push(Integer.parseInt(op));
            }
        }

        int res = 0;
        while(!stack.empty()) {
            res += stack.pop();
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
