package leetcode.editor.cn;

import java.util.LinkedList;

public class P38CountAndSay {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String countAndSay(int n) {
            String seq = "1";
            while(--n > 0) {
                seq = trans(seq);
//                System.out.println(seq);
            }
            return seq;
        }

        private String trans(String s) {
            LinkedList<Number> nums = new LinkedList<>();
            nums.add(new Number(s.charAt(0), 0));
            for(char c : s.toCharArray()) {
                if(c == nums.getLast().c) nums.getLast().count++;
                else nums.add(new Number(c, 1));
            }
            StringBuilder res = new StringBuilder();
            for(Number num : nums) {
                res.append(num.count);
                res.append(num.c);
            }
            return res.toString();
        }

        class Number {
            char c;
            int count;

            public Number(char c, int count) {
                this.c = c;
                this.count = count;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}