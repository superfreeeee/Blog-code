package leetcode.editor.cn;
public class P65ValidNumber {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isNumber(String s) {
        s = s.trim();
        int state = 0;
        boolean[] valid = new boolean[]{false, false, true, false, true, true, false, false, true};
        int[][] trans = new int[][]{
                // +- , d , . , e , alpha and other
                {1, 2,  3, -1}, // ready
                {-1, 2, 3, -1}, // num sign
                {-1, 2, 4, 6}, // num int
                {-1, 5, -1, -1}, // pre dot
                {-1, 5, -1, 6}, // dot
                {-1, 5, -1, 6}, // num float
                {7, 8, -1, -1}, // exp ready
                {-1, 8, -1, -1}, // exp sign
                {-1, 8, -1, -1} // exp
        };
        for(char c : s.toCharArray()) {
            if(c == '+' || c == '-') state = trans[state][0];
            else if(Character.isDigit(c)) state = trans[state][1];
            else if(c == '.') state = trans[state][2];
            else if(c == 'e') state = trans[state][3];
            else return false;
//            System.out.println(state);
            if(state == -1) return false;
        }
        return valid[state];
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}