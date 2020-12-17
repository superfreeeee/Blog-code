package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P476NumberComplement {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int findComplement(int num) {
            List<Integer> list = new ArrayList<>();
            while(num > 0) {
                list.add(num % 2);
                num /= 2;
            }
//            System.out.println(list);
            int res = 0;
            for(int i=list.size() - 1 ; i>=0 ; i--) {
                res = res * 2 + (list.get(i) ^ 1);
//                System.out.println(res);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}