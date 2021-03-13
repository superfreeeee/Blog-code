package leetcode.editor.cn;
public class P389FindTheDifference {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public char findTheDifference(String s, String t) {
        char res = 0;
        for(char c : s.toCharArray()) res ^= c;
        for(char c : t.toCharArray()) res ^= c;
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}