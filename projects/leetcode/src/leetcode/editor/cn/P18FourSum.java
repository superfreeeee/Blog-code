package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class P18FourSum {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public List<List<Integer>> fourSum(int[] nums, int target) {
            System.out.println(Arrays.toString(nums));
            insertionSort(nums);
            System.out.println(Arrays.toString(nums));
            List<List<Integer>> res = new ArrayList<>();
            int l1 = 0, l2 = 1;
            return res;
        }

        private void insertionSort(int[] nums) {
            for(int i=1 ; i<nums.length ; i++) {
                int j = i;
                int carry = nums[i];
                while(j > 0 && nums[j] >= nums[i]){
                    nums[j] = nums[j-1];
                    j--;
                }
                nums[j] = carry;
                System.out.println(Arrays.toString(nums));
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}