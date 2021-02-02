package leetcode.editor.cn;

import java.util.Stack;

public class P739DailyTemperatures {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] dailyTemperatures(int[] T) {
            Stack<Integer> temps = new Stack<>();
            int[] res = new int[T.length];
            for(int i=T.length-1 ; i>=0 ; i--) {
                while(!temps.empty() && T[temps.peek()] <= T[i]) temps.pop();
                res[i] = temps.empty() ? 0 : temps.peek() - i;
                temps.add(i);
                System.out.println(temps);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
