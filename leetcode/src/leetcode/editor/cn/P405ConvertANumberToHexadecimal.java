package leetcode.editor.cn;

public class P405ConvertANumberToHexadecimal {
    public static void main(String[] args) {
        System.out.println(new P405ConvertANumberToHexadecimal().new Solution().toHex(-1));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String toHex(int num) {
            return Integer.toHexString(num);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}