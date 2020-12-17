package leetcode.editor.cn;

import java.util.LinkedList;
import java.util.Queue;

public class P225ImplementStackUsingQueues {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class MyStack {

        private Queue<Integer> queue = new LinkedList<>();

        /**
         * Initialize your data structure here.
         */
        public MyStack() {

        }

        /**
         * Push element x onto stack.
         */
        public void push(int x) {
            queue.add(x);
        }

        /**
         * Removes the element on top of the stack and returns that element.
         */
        public int pop() {
            int size = queue.size();
            while (size-- > 1) {
                queue.add(queue.poll());
            }
            return queue.poll();
        }

        /**
         * Get the top element.
         */
        public int top() {
            int size = queue.size();
            while (size-- > 0) {
                int num = queue.poll();
                queue.add(num);

                if (size == 0) {
                    return num;
                }
            }
            return 0;
        }

        /**
         * Returns whether the stack is empty.
         */
        public boolean empty() {
            return queue.size() == 0;
        }
    }

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */

//leetcode submit region end(Prohibit modification and deletion)

}
