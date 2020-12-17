package leetcode.editor.cn;
public class P84LargestRectangleInHistogram {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int largestRectangleArea(int[] heights) {
            int ans = 0;
            for(int center=0 ; center<heights.length ; center++) {
                System.out.println(center);
                int left = center, right = center;
                while(left > 0 && heights[left - 1] >= heights[center]) {
                    left--;
//                System.out.println("left: " + left);
                }
                while(right < heights.length-1 && heights[right + 1] >= heights[center]) {
                    right++;
//                System.out.println("right: " + right);
                }
                System.out.println(heights[center] + " " + left + " " + right + " " + (right - left + 1));
                ans = Math.max(ans, heights[center] * (right - left + 1));
                System.out.println("ans: " + ans);
            }
            return ans;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
