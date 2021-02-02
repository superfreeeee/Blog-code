package leetcode.editor.cn;
public class P231PowerOfTwo {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isPowerOfTwo(int n) {
        if(n <= 0) return false;
        while(n > 1 && n % 2 == 0) n /= 2;
        return n == 1;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
