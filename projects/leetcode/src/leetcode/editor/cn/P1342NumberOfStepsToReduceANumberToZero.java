package leetcode.editor.cn;

public class P1342NumberOfStepsToReduceANumberToZero {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int numberOfSteps(int num) {
            int res = 0;
            while (num > 0) {
                if (num % 2 == 0) num /= 2;
                else num--;
                res++;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}