package leetcode.editor.cn;

import java.util.Arrays;

public class P794ValidTicTacToeState {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean validTicTacToe(String[] board) {
            char[] b = new char[9];
            int idx = 0;
            for (String row : board) {
                for (char c : row.toCharArray()) {
                    b[idx++] = c;
                }
            }
            int o = 0, x = 0;
            for (char c : b) {
                if (c == 'O') o++;
                else if (c == 'X') x++;
            }
            if (!(x - o == 0 || x - o == 1)) return false;

            for (int i = 0; i < 3; i++) {
                check(b[i * 3], b[i * 3 + 1], b[i * 3 + 2]);
                check(b[i], b[3 + i], b[6 + i]);
            }
            check(b[0], b[4], b[8]);
            check(b[2], b[4], b[6]);
            return winner != 3;
        }

        private int winner = 0;

        private void check(char a, char b, char c) {
           if(a == b && a == c && a != ' ') {
               if(a == 'O') winner |= 1;
               else winner |= 2;
           }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}