package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class P895MaximumFrequencyStack {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class FreqStack {

        private Map<Integer, Integer> freq = new HashMap<>();
        private Map<Integer, Stack<Integer>> stacks = new HashMap<>();
        private int maxFreq = 0;

        public FreqStack() {

        }

        public void push(int x) {
            int f = freq.getOrDefault(x, 0) + 1;
            freq.put(x, f);
            if(f > maxFreq) {
                maxFreq = f;
            }
            stacks.computeIfAbsent(f, z -> new Stack<>()).push(x);
        }

        public int pop() {
            int x = stacks.get(maxFreq).pop();
            freq.put(x, freq.get(x) - 1);
            if(stacks.get(maxFreq).size() == 0) {
                maxFreq--;
            }
            return x;
        }
    }

/**
 * Your FreqStack object will be instantiated and called as such:
 * FreqStack obj = new FreqStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 */
//leetcode submit region end(Prohibit modification and deletion)

}
