package leetcode.editor.cn;

public class P397IntegerReplacement {
    public static void main(String[] args) {
        Solution solution = new P397IntegerReplacement().new Solution();
        for (int i = 1; i < 20; i++) {
            System.out.println(solution.integerReplacement(i));
        }
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int integerReplacement(int n) {
            long ln = n;
            int res = 0;
            while (ln > 1) {
                if (ln == 3 || ln % 4 == 1) ln--;
                else if (ln % 4 == 3) ln++;
                else ln /= 2;
                res++;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}