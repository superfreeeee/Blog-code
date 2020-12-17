package leetcode.editor.cn;

public class P8StringToIntegerAtoi {
    public static void main(String[] args) {

    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int myAtoi(String s) {
            int i = 0;
            while (i < s.length() && s.charAt(i) == ' ') i++;
            if (i >= s.length()) return 0;
            char c = s.charAt(i);
            if (!Character.isDigit(c) && c != '-' && c != '+') return 0;
            int neg = c == '-' ? -1 : 1;
            if (!Character.isDigit(c)) i++;
            int num = 0;
            while (i < s.length() && Character.isDigit(c = s.charAt(i))) {
                int next = c - '0';
                if (neg > 0 && (num > Integer.MAX_VALUE / 10 || num == Integer.MAX_VALUE / 10 && next > 7))
                    return Integer.MAX_VALUE;
                if (neg < 0 && (num > Integer.MAX_VALUE / 10 || num == Integer.MAX_VALUE / 10 && next > 8))
                    return Integer.MIN_VALUE;
                num = num * 10 + next;
                i++;
            }
            return neg * num;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}