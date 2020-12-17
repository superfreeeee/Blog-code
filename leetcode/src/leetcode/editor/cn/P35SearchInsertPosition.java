package leetcode.editor.cn;
public class P35SearchInsertPosition {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int searchInsert(int[] nums, int target) {
        for(int i=0 ; i<nums.length ; i++) {
            if(nums[i] >= target) return i;
        }
        return nums.length;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}