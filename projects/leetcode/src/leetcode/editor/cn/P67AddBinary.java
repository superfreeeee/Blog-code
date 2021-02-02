package leetcode.editor.cn;

public class P67AddBinary {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String addBinary(String a, String b) {
            char[] n1 = new StringBuilder(a).reverse().toString().toCharArray();
            char[] n2 = new StringBuilder(b).reverse().toString().toCharArray();
            StringBuilder res = new StringBuilder();
            int carry = 0;
            for (int i = 0, endi = Math.max(n1.length, n2.length); i < endi; i++) {
                if(i < n1.length) carry += n1[i] - '0';
                if(i < n2.length) carry += n2[i] - '0';
                res.append(Character.toChars(carry % 2 + '0'));
                carry = carry / 2;
            }
            if(carry > 0) res.append('1');
            return res.reverse().toString();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}