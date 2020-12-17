package leetcode.editor.cn;

import java.util.HashSet;
import java.util.Set;

public class P217ContainsDuplicate {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for(int num : nums) {
            if(set.contains(num)) return true;
            set.add(num);
        }
        return false;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
