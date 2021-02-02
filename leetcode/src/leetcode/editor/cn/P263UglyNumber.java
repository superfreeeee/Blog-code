package leetcode.editor.cn;

public class P263UglyNumber {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean isUgly(int num) {
            if (num == 0) return false;
            num = filter(filter(filter(num, 2), 3), 5);
            return num == 1;
        }

        private int filter(int num, int div) {
            while (num % div == 0) num /= div;
            return num;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}