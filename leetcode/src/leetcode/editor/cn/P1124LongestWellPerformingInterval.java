package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Stack;

public class P1124LongestWellPerformingInterval {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int longestWPI(int[] hours) {
        int[] pre = presum(hours);
        Stack<Integer> dec = new Stack<>();
        for(int i=0 ; i<pre.length ; i++) {
            if(dec.isEmpty() || pre[i] < pre[dec.peek()]) {
                dec.push(i);
            }
        }
        System.out.println(Arrays.toString(pre));
        System.out.println(dec);
        int ans = 0;
        for(int i=pre.length-1 ; i>=0 ; i--) {
            while(!dec.isEmpty() && pre[i] - pre[dec.peek()] > 0) {
                ans = Math.max(ans, i - dec.pop());
            }
        }
        return ans;
    }

    public int[] presum(int[] hours) {
        int n = hours.length;
        int[] res = new int[n+1];
        res[0] = 0;
        for(int i=0 ; i<n ; i++) {
            res[i+1] = hours[i] > 8 ? 1 : -1;
        }
        for(int i=1 ; i<n+1 ; i++) {
            res[i] = res[i] + res[i-1];
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
