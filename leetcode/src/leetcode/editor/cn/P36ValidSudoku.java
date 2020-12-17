package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Set;

public class P36ValidSudoku {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private final int N = 9;

        public boolean isValidSudoku(char[][] board) {
            boolean[] nums;

            for (int i = 0; i < N; i++) {
                nums = new boolean[N];
                for (int j = 0; j < N; j++) {
                    if (board[i][j] != '.') {
                        int num = board[i][j] - '1';
                        if (nums[num]) {
//                            System.out.println("rows: " + i + " " + j);
                            return false;
                        }
                        else nums[num] = true;
                    }
                }
            }
            for (int i = 0; i < N; i++) {
                nums = new boolean[N];
                for (int j = 0; j < N; j++) {
                    if (board[j][i] != '.') {
                        int num = board[j][i] - '1';
                        if (nums[num]) {
//                            System.out.println("cols " + i + " " + j);
                            return false;
                        }
                        else nums[num] = true;
                    }
                }
            }
            for (int i = 0; i < N / 3; i++) {
                for (int j = 0; j < N / 3; j++) {
                    nums = new boolean[N];
                    for (int ii = i * 3, endi = i * 3 + 3; ii < endi; ii++) {
                        for (int jj = j * 3, endj = j * 3 + 3; jj < endj; jj++) {
                            if (board[ii][jj] != '.') {
                                int num = board[ii][jj] - '1';
                                if (nums[num]) {
//                                    System.out.println("blocks: " + ii + " " + jj);
                                    return false;
                                }
                                else nums[num] = true;
                            }
                        }
                    }
                }
            }
            return true;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}