package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Comparator;

public class P179LargestNumber {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String largestNumber(int[] nums) {
        String[] numsStr = Arrays.stream(nums).mapToObj(String::valueOf).sorted(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                String s1 = o1 + o2;
                String s2 = o2 + o2;
                return s2.compareTo(s1);
            }
        }).toArray(String[]::new);
        StringBuilder res = new StringBuilder();
        for(String s : numsStr) res.append(s);
        String ans = res.toString();
        if(ans.matches("^0+$")) return "0";
        return res.toString();
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}