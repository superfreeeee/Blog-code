package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P273IntegerToEnglishWords {
    public static void main(String[] args) {
        Solution solution = new P273IntegerToEnglishWords().new Solution();
        System.out.println(solution.numberToWords(123));
        System.out.println(solution.numberToWords(10));
        System.out.println(solution.numberToWords(12));
        System.out.println(solution.numberToWords(1_234_567));
        System.out.println(solution.numberToWords(12345));
        System.out.println(solution.numberToWords(1234567));
        System.out.println(solution.numberToWords(1234567891));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        private List<String> words;
        private String[] digits = new String[]{"One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
        private String[] tens = new String[]{"Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
        private String[] tenplus = new String[]{"Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};

        public String numberToWords(int num) {
            if (num == 0) return "Zero";
            words = new ArrayList<>();
            String[] stages = new String[]{"Billion", "Million", "Thousand"};
            int[] bases = new int[]{1_000_000_000, 1_000_000, 1_000};
            for (int i = 0; i < 3; i++) {
                add(num, stages[i], bases[i]);
                num %= bases[i];
            }
            add(num, null, 1);
//            System.out.println(words);
            return String.join(" ", words);
        }

        private void add(int num, String stage, int base) {
            if (num < base) return;
            int cur = num / base;
            if (cur >= 100) {
                int h = cur / 100;
                words.add(digits[h - 1]);
                words.add("Hundred");
                cur %= 100;
            }
            if (cur >= 20 || cur == 10) {
                int t = cur / 10;
                words.add(tens[t - 1]);
                cur -= t * 10;
            }
            if (cur > 10) {
                words.add(tenplus[cur - 11]);
                cur = 0;
            }
            if (cur > 0) {
                words.add(digits[cur - 1]);
            }
            if (stage != null) words.add(stage);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}