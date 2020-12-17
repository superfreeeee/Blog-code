package leetcode.editor.cn;

import java.util.Stack;

public class P394DecodeString {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String decodeString(String s) {
            Stack stack = new Stack();
            int num = 0;
            String text = "";
            for(char c : s.toCharArray()) {
                if(isDigit(c)) {
                    num = num * 10 + (c - '0');
                } else if(c == '[') {
                    stack.push(text);
                    stack.push(num);
                    num = 0;
                    text = "";
                } else if(c == ']') {
                    String inner = "";
                    for(int i=0, end=(int)stack.pop() ; i<end ; i++) {
                        inner += text;
                    }
                    text = String.valueOf(stack.pop()) + inner;
                } else {
                    text += c;
                }
                System.out.println(num + " " + text);
            }
            return text;
        }

        private boolean isDigit(char c) {
            return '0' <= c && c <= '9';
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
