package leetcode.editor.cn;

import java.util.Arrays;

public class P198HouseRobber {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if(n == 0) return 0;
        int[] res = new int[n + 1];
        res[0] = 0;
        res[1] = nums[0];
        for(int i=2 ; i<=n ; i++) {
            res[i] = Math.max(res[i-1], res[i-2] + nums[i-1]);
            System.out.println(Arrays.toString(res));
        }
        return res[n];
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
