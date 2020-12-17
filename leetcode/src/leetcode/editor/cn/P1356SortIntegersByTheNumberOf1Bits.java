package leetcode.editor.cn;

import java.util.Arrays;
import java.util.Comparator;

public class P1356SortIntegersByTheNumberOf1Bits {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int[] sortByBits(int[] arr) {
        return Arrays.stream(arr).sorted().boxed().sorted(Comparator.comparing(Integer:: bitCount)).mapToInt(Integer::valueOf).toArray();
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}