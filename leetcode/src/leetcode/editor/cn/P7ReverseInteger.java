package leetcode.editor.cn;

public class P7ReverseInteger {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE);
        System.out.println(Integer.MIN_VALUE);
        System.out.println(-1 % 10);
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int reverse(int x) {
            int ans = 0;
            while (x > 0 && (ans < Integer.MAX_VALUE / 10 || ans == Integer.MAX_VALUE / 10 && x % 10 <= 7) ||
                    x < 0 && (ans > Integer.MIN_VALUE / 10 || ans == Integer.MIN_VALUE / 10 && x % 10 >= -8)) {
                ans *= 10;
                ans += x % 10;
                x /= 10;
            }
            if (x != 0) {
                return 0;
            }
            return ans;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
