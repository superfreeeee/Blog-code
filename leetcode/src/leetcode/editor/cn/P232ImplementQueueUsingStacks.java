package leetcode.editor.cn;

import java.util.Stack;

public class P232ImplementQueueUsingStacks {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class MyQueue {

        private Stack<Integer> stack = new Stack<>();

        /**
         * Initialize your data structure here.
         */
        public MyQueue() {

        }

        /**
         * Push element x to the back of queue.
         */
        public void push(int x) {
            stack.push(x);
        }

        /**
         * Removes the element from in front of queue and returns that element.
         */
        public int pop() {
            int size = stack.size();
            Stack<Integer> newStack = new Stack<>();
            for (int i = 0; i < size - 1; i++) {
                newStack.push(stack.pop());
            }
            int res = stack.pop();
            for (int i = 0; i < size - 1; i++) {
                stack.push(newStack.pop());
            }
            return res;
        }

        /**
         * Get the front element.
         */
        public int peek() {
            int size = stack.size();
            Stack<Integer> newStack = new Stack<>();
            for (int i = 0; i < size - 1; i++) {
                newStack.push(stack.pop());
            }
            int res = stack.pop();
            newStack.push(res);
            for (int i = 0; i < size; i++) {
                stack.push(newStack.pop());
            }
            return res;
        }

        /**
         * Returns whether the queue is empty.
         */
        public boolean empty() {
            return stack.empty();
        }
    }

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */

//leetcode submit region end(Prohibit modification and deletion)

}
