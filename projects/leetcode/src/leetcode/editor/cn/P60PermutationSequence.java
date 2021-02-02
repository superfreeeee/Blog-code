package leetcode.editor.cn;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class P60PermutationSequence {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public String getPermutation(int n, int k) {
            int[] jie = new int[n + 1];
            jie[0] = 1;
            for (int i = 1; i <= n; i++) jie[i] = i * jie[i - 1];
            k--;
            List<Integer> pos = new LinkedList<>();
            for (int i = 1; i <= n; i++) pos.add(i);
            StringBuilder res = new StringBuilder();
            while(pos.size() > 0) {
//                System.out.println(res.toString());
//                System.out.println(pos);
//                System.out.println(k);
                int base = jie[pos.size() - 1];
                int seq = k / base;
                res.append(pos.remove(seq));
                k %= base;
            }
            return res.toString();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}