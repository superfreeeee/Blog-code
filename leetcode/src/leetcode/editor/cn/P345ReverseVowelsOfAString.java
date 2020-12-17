package leetcode.editor.cn;

import java.util.HashSet;
import java.util.Set;

public class P345ReverseVowelsOfAString {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String reverseVowels(String s) {
        char[] s0 = s.toCharArray();
        Set<Character> vowels = buildVowels();

        int l = 0, r = s0.length - 1;
        while(true) {
            while(l < s0.length && !vowels.contains(s0[l])) l++;
            while(r >= 0 && !vowels.contains(s0[r])) r--;
            if(l < r) {
                char tmp = s0[l];
                s0[l] = s0[r];
                s0[r] = tmp;
                l++;
                r--;
            } else {
                break;
            }
        }
        return String.valueOf(s0);
    }

    private Set<Character> buildVowels() {
        Set<Character> vowels = new HashSet<>();
        vowels.add('a');
        vowels.add('e');
        vowels.add('i');
        vowels.add('o');
        vowels.add('u');
        vowels.add('A');
        vowels.add('E');
        vowels.add('I');
        vowels.add('O');
        vowels.add('U');
        return vowels;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}