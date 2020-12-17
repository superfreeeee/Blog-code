package leetcode.editor.cn;

import java.util.Stack;

public class P1209RemoveAllAdjacentDuplicatesInStringIi {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String removeDuplicates(String s, int k) {
        Stack<Tuple> chars = new Stack<>();
        for(char c : s.toCharArray()) {
            if(chars.isEmpty() || c != chars.peek().c) {
                chars.push(new Tuple(c, 1));
            } else {
                chars.peek().count++;
            }
            if(chars.peek().count >= k) {
                chars.pop();
            }
//            System.out.println(chars);
        }
        StringBuilder res = new StringBuilder();
        while(!chars.isEmpty()) {
            Tuple t = chars.pop();
            while(t.count-- > 0) {
                res.append(t.c);
            }
        }
        return res.reverse().toString();
    }

    class Tuple {
        char c;
        int count;

        public Tuple(char c, int count) {
            this.c = c;
            this.count = count;
        }

        public String toString() {
            return "{" + c + "=" + count + "}";
        }
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
