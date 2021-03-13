package leetcode.editor.cn;

public class P922SortArrayByParityIi {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] sortArrayByParityII(int[] A) {
            int i = 0, j = 0;
            int[] res = new int[A.length];
            for (int a : A) {
                if (a % 2 == 0) res[2 * (i++)] = a;
                else res[2 * (j++) + 1] = a;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}