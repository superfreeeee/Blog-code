package leetcode.editor.cn;

import java.util.Stack;

public class P735AsteroidCollision {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> stack = new Stack<>();
        for(int a : asteroids) {
            if(stack.empty() || a > 0) {
                stack.push(a);
            } else {
                while(!stack.empty() && stack.peek() > 0 && stack.peek() + a < 0) stack.pop();
                if(stack.empty() || stack.peek() < 0) {
                    stack.push(a);
                } else if(stack.peek() + a == 0) {
                    stack.pop();
                }
            }
        }
        int[] res = new int[stack.size()];
        for(int i=res.length-1 ; i>=0 ; i--) {
            res[i] = stack.pop();
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
