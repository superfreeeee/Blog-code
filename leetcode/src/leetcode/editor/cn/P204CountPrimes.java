package leetcode.editor.cn;

import java.util.Arrays;

public class P204CountPrimes {
    public static void main(String[] args) {
        System.out.println((new boolean[1])[0]);
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public int countPrimes(int n) {
            boolean[] isPrime = new boolean[n + 1];
            for (int i = 2; i < n; i++) isPrime[i] = true;
            int sum = 0;
            for (int i = 2; i < n; i++) {
                if(isPrime[i]) {
                    sum++;
                    int time = 2;
                    while (i * time < n) isPrime[i * (time++)] = false;
                }
            }
//            System.out.println(Arrays.toString(isPrime));
            return sum;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
