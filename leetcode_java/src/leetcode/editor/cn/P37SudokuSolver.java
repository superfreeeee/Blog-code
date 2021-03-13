package leetcode.editor.cn;

public class P37SudokuSolver {
    public static void main(String[] args) {
        System.out.println((char) (1 + '1'));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private final int N = 9;

        public void solveSudoku(char[][] board) {
            solve(board);
        }

        private boolean solve(char[][] board) {
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < N; j++) {
                    if (board[i][j] != '.') continue;
                    for (int k = 1; k <= N; k++) {
                        board[i][j] = (char) (k + '0');
                        if (valid(board) && solve(board)) break;
                        board[i][j] = '.';

                    }
                    if(board[i][j] == '.') return false;
                }
            }
            return true;
        }

        private boolean[] nums;

        public boolean valid(char[][] board) {

            for (int i = 0; i < N; i++) {
                nums = new boolean[N];
                for (int j = 0; j < N; j++) {
                    if (board[i][j] != '.') {
                        int num = board[i][j] - '1';
                        if (nums[num]) {
//                            System.out.println("rows: " + i + " " + j);
                            return false;
                        } else nums[num] = true;
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
                        } else nums[num] = true;
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
                                } else nums[num] = true;
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