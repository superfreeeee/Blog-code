package leetcode.editor.cn;

public class P258AddDigits {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int addDigits(int num) {
            int sum = 0;
            while (num > 0) {
                sum += num % 10;
                num /= 10;
            }
            if (sum >= 10) sum = addDigits(sum);
            return sum;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}