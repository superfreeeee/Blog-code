package leetcode.editor.cn;

import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class P880DecodedStringAtIndex {
    public static void main(String[] args) {
        Stack<Character> stack = new Stack<>();
        stack.push('1');
        stack.push('2');
        stack.push('3');
        List<Character> copy = Arrays.asList(stack.toArray(new Character[0]));
        System.out.println(copy);

    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String decodeAtIndex(String S, int K) {
        long size = 0;
        Stack<Integer> times = new Stack<>();
        for(char c : S.toCharArray()) {
            if(Character.isDigit(c)) {
                size *= c - '0';
            } else {
                size++;
            }
        }
//        System.out.println(size);

        for(int i=S.length()-1 ; i>=0 ; i--) {
            char c = S.charAt(i);
            K %= size;
            if(K == 0 && Character.isLetter(c)) {
                return ""+c;
            }

            if(Character.isDigit(c)) {
                size /= (c - '0');
            } else {
                size--;
            }
//            System.out.println(size);
        }
        return "";
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
