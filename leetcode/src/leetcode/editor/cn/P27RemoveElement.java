package leetcode.editor.cn;
public class P27RemoveElement {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int removeElement(int[] nums, int val) {
        int top = -1;
        for(int i=0 ; i<nums.length ; i++) {
            if(nums[i] != val) nums[++top] = nums[i];
        }
        return top + 1;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}