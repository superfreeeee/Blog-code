package leetcode.editor.cn;
public class P172FactorialTrailingZeroes {
    public static void main(String[] args) {
        Solution solution = new P172FactorialTrailingZeroes().new Solution();
        System.out.println(solution.trailingZeroes(100));
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int trailingZeroes(int n) {
        int base = 5;
        int ans = 0;
        while(n >= base) {
            ans += n / base;
            base *= 5;
        }
        return ans;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}