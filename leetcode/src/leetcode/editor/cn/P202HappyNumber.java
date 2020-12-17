package leetcode.editor.cn;

import java.util.HashSet;
import java.util.Set;

public class P202HappyNumber {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isHappy(int n) {
        Set<Integer> nums = new HashSet<>();
        nums.add(n);
        int cur = n;
        while(cur > 1) {
            cur = map(cur);
            if(nums.contains(cur)) return false;
            nums.add(cur);
        }
        return true;
    }

    private int map(int n) {
        int sum = 0;
        while(n > 0) {
            int i = n % 10;
            n /= 10;
            sum += i * i;
        }
        return sum;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
