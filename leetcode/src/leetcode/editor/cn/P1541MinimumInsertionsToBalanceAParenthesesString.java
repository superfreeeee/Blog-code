package leetcode.editor.cn;

import java.util.Stack;

public class P1541MinimumInsertionsToBalanceAParenthesesString {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int minInsertions(String s) {
            int count = 0;
            int ans = 0;
            for(int i=0 ; i<s.length() ; i++) {
                if(s.charAt(i) == '(') {
                    count++;
                } else {
                    if(i + 1 < s.length() && s.charAt(i+1) == ')') {
                        i++;
                    } else {
                        ans++;
                    }
                    if(count == 0) {
                        ans++;
                    } else {
                        count--;
                    }
                }
            }
            ans += count * 2;
            return ans;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
