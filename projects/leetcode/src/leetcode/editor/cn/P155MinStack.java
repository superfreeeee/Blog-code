package leetcode.editor.cn;
public class P155MinStack {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class MinStack {

        private int[] stack = new int[1];
        private int[] minStack = new int[1];
        private int top = -1;
        private int minTop = -1;

        /** initialize your data structure here. */
        public MinStack() {
            minStack[++minTop] = Integer.MAX_VALUE;
        }

        public void push(int x) {
            if(top >= stack.length - 2) {
                expand();
            }
            stack[++top] = x;
            int oldMin = minStack[minTop];
            minStack[++minTop] = Math.min(x, oldMin);
        }

        private void expand() {
            int size = stack.length;
            int[] newStack = new int[size * 2];
            int[] newMinStack = new int[size * 2];
            for(int i=0 ; i<size ; i++) {
                newStack[i] = stack[i];
                newMinStack[i] = minStack[i];
            }
            stack = newStack;
            minStack = newMinStack;
        }

        public void pop() {
            top--;
            minTop--;
        }

        public int top() {
            return stack[top];
        }

        public int getMin() {
            return minStack[minTop];
        }
    }

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */

//leetcode submit region end(Prohibit modification and deletion)

}
