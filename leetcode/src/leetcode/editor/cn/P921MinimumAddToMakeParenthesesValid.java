package leetcode.editor.cn;

import java.util.Stack;

public class P921MinimumAddToMakeParenthesesValid {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int minAddToMakeValid(String S) {
        int count = 0;
        int ans = 0;
        for(char c : S.toCharArray()) {
            if(c == '(') {
                count++;
            } else {
                if(count == 0) {
                    ans++;
                } else {
                    count--;
                }
            }
        }
        ans += count;
        return ans;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
