package leetcode.editor.cn;

import java.util.Stack;

public class P1130MinimumCostTreeFromLeafValues {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int mctFromLeafValues(int[] arr) {
            Stack<Integer> leafs = new Stack<>();
            leafs.push(Integer.MAX_VALUE);
            int sum = 0;
            for (int leaf : arr) {
                while (leafs.peek() < leaf) {
                    sum += leafs.pop() * Math.min(leaf, leafs.peek());
//                    System.out.println(sum);
//                    System.out.println(leafs);
                }
                leafs.push(leaf);
            }
            while (leafs.size() > 2) {
                sum += leafs.pop() * leafs.peek();
//                System.out.println(sum);
//                System.out.println(leafs);
            }
            return sum;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
