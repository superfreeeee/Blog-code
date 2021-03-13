package leetcode.editor.cn;

public class P762PrimeNumberOfSetBitsInBinaryRepresentation {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int countPrimeSetBits(int L, int R) {
            int res = 0;
            for (int i = L; i <= R; i++) {
                if (smallPrime(Integer.bitCount(i))) res++;
            }
            return res;
        }

        private boolean smallPrime(int num) {
            return num == 2 || num == 3 || num == 5 || num == 7 || num == 11 || num == 13 || num == 17 || num == 19;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}