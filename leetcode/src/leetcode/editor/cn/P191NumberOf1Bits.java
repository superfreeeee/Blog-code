package leetcode.editor.cn;
public class P191NumberOf1Bits {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int res = 0;
        while(n != 0) {
            res += n & 1;
            n >>>= 1;
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}