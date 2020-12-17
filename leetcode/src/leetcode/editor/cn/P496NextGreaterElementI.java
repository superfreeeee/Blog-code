package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class P496NextGreaterElementI {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> nextGreater = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        for(int i=nums2.length-1 ; i>=0 ; i--) {
            while(!stack.empty() && stack.peek() <= nums2[i]) {
                stack.pop();
            }
            nextGreater.put(nums2[i], stack.empty() ? -1 : stack.peek());
            stack.push(nums2[i]);
        }

        int[] res = new int[nums1.length];
        for(int i=0 ; i<nums1.length ; i++) {
            res[i] = nextGreater.get(nums1[i]);
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
