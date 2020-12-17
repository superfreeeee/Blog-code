package leetcode.editor.cn;
public class P168ExcelSheetColumnTitle {
    public static void main(String[] args) {
        Solution solution = new P168ExcelSheetColumnTitle().new Solution();
        System.out.println(solution.convertToTitle(1));
        System.out.println(solution.convertToTitle(26));
        System.out.println(solution.convertToTitle(27));
        System.out.println(solution.convertToTitle(53));
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String convertToTitle(int n) {
        StringBuilder res = new StringBuilder();
        while(n > 0) {
            res.append(Character.toChars((n - 1) % 26 + 'A'));
            n = (n - 1) / 26;
        }
        return res.reverse().toString();
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
//0 26 52
//1 27 53
//27 53