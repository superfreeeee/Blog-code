package leetcode.editor.cn;

public class P477TotalHammingDistance {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int totalHammingDistance(int[] nums) {
            int res = 0;
            for (int i = 0; i < 32; i++) {
                int[] count = new int[]{0, 0};
                for (int num : nums) {
                    count[(num >>> i) % 2]++;
                }
                res += count[0] * count[1];
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}