package leetcode.editor.cn;

import java.util.Stack;

public class P1381DesignAStackWithIncrementOperation {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class CustomStack {

        private Stack<Integer> stack;
        private int limit;
        private int[] inc;

        public CustomStack(int maxSize) {
            stack = new Stack<>();
            limit = maxSize;
            inc = new int[maxSize];
        }

        public void push(int x) {
            if(stack.size() < limit) {
                stack.push(x);
            }
        }

        public int pop() {
            int res = stack.empty() ? -1 : stack.pop() + inc[stack.size()];
            inc[stack.size()] = 0;
            return res;
        }

        public void increment(int k, int val) {
            for(int i=0 ; i<Math.min(k, stack.size()) ; i++) {
                inc[i] += val;
            }
        }
    }

/**
 * Your CustomStack object will be instantiated and called as such:
 * CustomStack obj = new CustomStack(maxSize);
 * obj.push(x);
 * int param_2 = obj.pop();
 * obj.increment(k,val);
 */
//leetcode submit region end(Prohibit modification and deletion)

}
