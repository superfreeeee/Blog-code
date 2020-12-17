package leetcode.editor.cn;

public class P242ValidAnagram {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        private int[] counter = new int[26];

        public boolean isAnagram(String s, String t) {
            if (s.length() != t.length()) return false;
            for (char c : s.toCharArray()) counter[c - 'a']++;
            for (char c : t.toCharArray()) counter[c - 'a']--;
            for (int i : counter) if (i != 0) return false;
            return true;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}