package leetcode.editor.cn;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class P771JewelsAndStones {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int numJewelsInStones(String J, String S) {
        Set<Character> js = new HashSet<>();
        for(char j : J.toCharArray()) {
            js.add(j);
        }
        int count = 0;
        for(char s : S.toCharArray()) {
            if(js.contains(s)) count++;
        }
        return count;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
