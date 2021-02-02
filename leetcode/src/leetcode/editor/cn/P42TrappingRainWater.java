package leetcode.editor.cn;

import java.util.Arrays;

public class P42TrappingRainWater {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int trap(int[] height) {
            if(height.length <= 2) {
                return 0;
            }
            int leftMax = height[0];
            int[] leftList = new int[height.length];
            for(int i=0 ; i<height.length ; i++) {
                if(height[i] > leftMax) {
                    leftMax = height[i];
                    leftList[i] = 0;
                } else {
                    leftList[i] = leftMax - height[i];
                }
            }
            int rightMax = height[height.length-1];
            int[] rightList = new int[height.length];
            for(int i=height.length-1 ; i >= 0 ; i--) {
                if(height[i] > rightMax) {
                    rightMax = height[i];
                    rightList[i] = 0;
                } else {
                    rightList[i] = rightMax - height[i];
                }
            }
            System.out.println(Arrays.toString(leftList));
            System.out.println(Arrays.toString(rightList));

            int result = 0;
            for(int i=0 ; i<height.length ; i++) {
                result += Math.min(leftList[i], rightList[i]);
            }
            return result;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
