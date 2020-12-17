package leetcode.editor.cn;
public class P171ExcelSheetColumnNumber {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int titleToNumber(String s) {
        int res = 0;
        for(char c : s.toCharArray()) {
            res = res * 26 + c - 'A' + 1;
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}