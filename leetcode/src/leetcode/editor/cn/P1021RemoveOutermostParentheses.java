package leetcode.editor.cn;

import java.util.Stack;

public class P1021RemoveOutermostParentheses {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String removeOuterParentheses(String S) {
        boolean inner = false;
        int count = 0;
        StringBuilder res = new StringBuilder();
        for(char c : S.toCharArray()) {
            if(c == '(') {
                if(!inner) {
                    inner = true;
                } else {
                    count++;
                    res.append("(");
                }
            } else {
                if(count == 0) {
                    inner = false;
                } else {
                    count--;
                    res.append(")");
                }
            }
        }
        return res.toString();
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
