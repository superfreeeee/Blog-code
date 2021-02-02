package leetcode.editor.cn;

import java.util.Stack;

public class P316RemoveDuplicateLetters {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String removeDuplicateLetters(String s) {
            Stack<Character> stack = new Stack<>();
            for(int i=0 ; i<s.length() ; i++) {
                char c = s.charAt(i);
                if(stack.contains(c)) {
                    continue;
                }
                while(stack.size() > 0 && stack.peek() > c) {
                    if(s.substring(i).contains(stack.peek()+"")) {
                        stack.pop();
                    } else {
                        break;
                    }
                }
                stack.push(c);
            }
            System.out.println(stack);
            StringBuilder res = new StringBuilder();
            while(!stack.empty()) {
                res.append(stack.pop());
            }
            return res.reverse().toString();
        }

    }

//leetcode submit region end(Prohibit modification and deletion)

}
