package leetcode.editor.cn;

import java.util.Arrays;

public class P85MaximalRectangle {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int maximalRectangle(char[][] matrix) {
            if (matrix.length == 0 || matrix[0].length == 0) {
                return 0;
            }
            int m = matrix.length, n = matrix[0].length;
            int[] cont = new int[n];
            for (int i = 0; i < n; i++) {
                cont[i] = 0;
            }

            int maxarea = 0;
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    cont[j] = matrix[i][j] == '0' ? 0 : cont[j] + 1;
                }
                maxarea = Math.max(maxarea, countArea(cont));
            }
            return maxarea;
        }

        private int countArea(int[] heights) {
            System.out.print(Arrays.toString(heights));
            int[] stack = new int[heights.length + 1];
            int top = -1;
            stack[++top] = -1;
            int res = 0;
            for(int i=0 ; i<heights.length ; i++) {
                while(top > 0 && heights[stack[top]] >= heights[i]) {
                    int h = heights[stack[top--]];
                    res = Math.max(res, h * (i - 1 - stack[top]));
                }
                stack[++top] = i;
            }
            while(top > 0) {
                int h = heights[stack[top--]];
                res = Math.max(res, h * (heights.length - 1 - stack[top]));
            }
            System.out.println(" " + res);
            return res;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
