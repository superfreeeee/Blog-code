package leetcode.editor.cn;

import java.util.Arrays;

public class P71SimplifyPath {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String simplifyPath(String path) {
            String[] dirs = path.split("/+");
            System.out.println(Arrays.toString(dirs));

            String[] stack = new String[dirs.length];
            int top = -1;

            for(String dir : dirs) {
                if(dir.equals(".") || dir.length() <= 0) {
                    continue;
                } else if(dir.equals("..")) {
                    if(top >= 0) {
                        top--;
                    }
                } else {
                    stack[++top] = dir;
                }

            }
            StringBuilder res = new StringBuilder();
            for(int i=0 ; i<=top ; i++) {
                res.append("/");
                res.append(stack[i]);
            }
            if(res.length() == 0) {
                res.append("/");
            }
            System.out.println(Arrays.toString(stack));
            System.out.println(res.toString());
            return res.toString();
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
