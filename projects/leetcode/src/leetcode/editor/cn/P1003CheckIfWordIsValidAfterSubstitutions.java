package leetcode.editor.cn;

import java.util.Stack;

public class P1003CheckIfWordIsValidAfterSubstitutions {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isValid(String s) {
        while(s.contains("abc")) {
            s = s.replaceAll("abc", "");
        }
        return s.length() == 0;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
