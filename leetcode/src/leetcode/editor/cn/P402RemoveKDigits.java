package leetcode.editor.cn;

import java.util.Stack;

public class P402RemoveKDigits {
    public static void main(String[] args) {
        Solution solution = new P402RemoveKDigits().new Solution();
        String res = solution.removeKdigits("112", 1);
        System.out.println(res);
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String removeKdigits(String num, int k) {
            Stack<Character> stack = new Stack<>();
            for(char c : num.toCharArray()) {
                while(k > 0 && stack.size() > 0 && stack.peek() > c) {
                    System.out.println(stack.peek() + " " + c);
                    stack.pop();
                    k--;
                }
                stack.push(c);
            }
            if(k > 0) {
                stack.pop();
                k--;
            }

            StringBuilder res = new StringBuilder();
            while(stack.size() > k) {
                res.append(stack.pop());
            }
            String result = res.reverse().toString();
            boolean zero = true;
            for(int i=0 ; i<result.length() ; i++) {
                if(result.charAt(i) != '0') {
                    result = result.substring(i);
                    zero = false;
                    break;
                }
            }
            if(zero || result.length() == 0) {
                return "0";
            }
            return result;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
