package leetcode.editor.cn;

public class P75SortColors {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public void sortColors(int[] nums) {
            int p0 = 0, p1 = 0;
            for(int i=0 ; i<nums.length ; i++) {
                if(nums[i] == 0) {
                    int tmp = nums[i];
                    nums[i] = nums[p0];
                    nums[p0] = tmp;
                    p0++;
                }
                if(nums[i] == 1) {
                    int tmp = nums[i];
                    nums[i] = nums[p1];
                    nums[p1] = tmp;
                    p1++;
                }
                if(p0 > p1) p1 = p0;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}