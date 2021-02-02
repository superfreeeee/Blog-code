package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collector;

public class P318MaximumProductOfWordLengths {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private boolean[][] exist;
        private boolean[][] m;

        public int maxProduct(String[] words) {
            words = Arrays.stream(words).sorted((s1, s2) -> s2.length() - s1.length()).toArray(String[]::new);
//            System.out.println(Arrays.toString(words));
            int n = words.length;
            exist = new boolean[n][26];
            m = new boolean[n][n];
            for (int i = 0; i < n; i++) {
                for (char c : words[i].toCharArray()) {
                    int indexC = c - 'a';
                    exist[i][indexC] = true;
                    for (int j = 0; j < i; j++) {
                        if (exist[j][indexC]) {
                            m[i][j] = m[j][i] = true;
                        }
                    }
                }
            }
//            for (boolean[] row : m) System.out.println(Arrays.toString(row));
            int res = 0;
            for (int i = 1; i < n; i++) {
                for (int j = 0; j < n - i; j++) {
                    if (!m[j][j + i]) {
                        res = Math.max(res, words[j].length() * words[j + i].length());
                    }
                }
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}