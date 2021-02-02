package leetcode.editor.cn;

public class P43MultiplyStrings {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String multiply(String num1, String num2) {
            if (num1.equals("0") || num2.equals("0")) return "0";
            String res = "";
            for (char c : num2.toCharArray()) {
                res += '0';
                int count = c - '0';
                while (count-- > 0) res = add(res, num1);
            }
            return res;
        }

        private String add(String num1, String num2) {
//        System.out.println("add: " + num1 + ", " + num2);
            StringBuilder res = new StringBuilder();
            char[] n1 = new StringBuilder(num1).reverse().toString().toCharArray();
            char[] n2 = new StringBuilder(num2).reverse().toString().toCharArray();
            int carry = 0;
            for (int i = 0, endi = Math.max(n1.length, n2.length); i < endi; i++) {
                if (i < n1.length) carry += n1[i] - '0';
                if (i < n2.length) carry += n2[i] - '0';
                res.append(Character.toChars(carry % 10 + '0'));
                carry /= 10;
            }
            if (carry > 0) res.append('1');
            return res.reverse().toString();
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}