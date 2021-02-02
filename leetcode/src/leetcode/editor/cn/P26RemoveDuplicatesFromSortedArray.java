package leetcode.editor.cn;

import java.util.LinkedList;

public class P26RemoveDuplicatesFromSortedArray {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int removeDuplicates(int[] nums) {
        int top = 0;
        for(int i=1 ; i<nums.length ; i++) {
            if(nums[i] != nums[top]) nums[++top] = nums[i];
        }
        return top + 1;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
