package leetcode.editor.cn;

public class P344ReverseString {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public void reverseString(char[] s) {
            char tmp;
            for (int i = 0, f = s.length / 2, len = s.length - 1; i < f; i++) {
                tmp = s[i];
                s[i] = s[len - i];
                s[len - i] = tmp;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}