package leetcode.editor.cn;
public class P20ValidParentheses {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean isValid(String s) {
            String sample = "([{)]}";

            int size = s.length() / 2;
            char[] stack = new char[size];
            int top = -1;
            for(char c : s.toCharArray()) {
                int index = sample.indexOf(c);
                if(index < 0) {
                    continue;
                }
                if(0 <= index && index <= 2) {
                    if(top >= size - 1) {
                        return false;
                    }
                    stack[++top] = c;
                } else {
                    if(top < 0) {
                        return false;
                    }
                    int gap = sample.indexOf(c) - sample.indexOf(stack[top--]);
                    if(gap != 3) {
                        return false;
                    }
                }
            }
            return top < 0;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
