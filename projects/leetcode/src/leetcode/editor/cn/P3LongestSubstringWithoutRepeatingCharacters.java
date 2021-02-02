package leetcode.editor.cn;

import java.util.HashSet;
import java.util.Set;

public class P3LongestSubstringWithoutRepeatingCharacters {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if(s.length() <= 1) {
            return s.length();
        }
        Set<Character> chars = new HashSet<>();
        chars.add(s.charAt(0));
        int ans = 1;
        for(int i=0, j=1 ; i<s.length() ; i++) {
            while(j < s.length() && !chars.contains(s.charAt(j))) {
                chars.add(s.charAt(j++));
            }
            ans = Math.max(ans, j - i);
            chars.remove(s.charAt(i));
//            System.out.println(i + " " + j);
//            System.out.println(chars);
        }
        return ans;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
