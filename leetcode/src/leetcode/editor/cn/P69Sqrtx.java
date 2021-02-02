package leetcode.editor.cn;

public class P69Sqrtx {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int mySqrt(int x) {
            if(x == 0) return 0;
            int res = (int)Math.exp(.5 * Math.log(x));
            return (long)(res + 1) * (res + 1) <= x ? res + 1 : res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}