package leetcode.editor.cn;
public class P9PalindromeNumber {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isPalindrome(int x) {
        if(x < 0) return false;
        int sample = x;
        int re = 0;
        while(sample != 0) {
            re = re * 10 + sample % 10;
            sample /= 10;
        }
        return re == x;
//        return String.valueOf(x).equals(new StringBuilder(String.valueOf(x)).reverse().toString());
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
