package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class P57InsertInterval {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        if(intervals.length == 0) return new int[][]{newInterval};
        List<List<Integer>> ins = new ArrayList<>();
        for(int[] p : intervals) ins.add(Arrays.stream(p).boxed().collect(Collectors.toList()));
//        System.out.println(ins);
        boolean cover = false;

        int i = 0;
        while(i < ins.size()) {
            List<Integer> p = ins.get(i);
            if(newInterval[0] <= p.get(1)) {
                if(newInterval[1] >= p.get(0)) {
                    p.set(0, Math.min(newInterval[0], p.get(0)));
                    p.set(1, Math.max(newInterval[1], p.get(1)));
                    cover = true;
                }
                break;
            }
            i++;
        }
//        System.out.println(i);

        if(cover) {
            List<Integer> cur = ins.remove(i);
            while (i < ins.size()) {
//                System.out.println(i);
//                System.out.println(ins);
                if (ins.get(i).get(0) <= cur.get(1)) {
                    List<Integer> next = ins.remove(i);
                    cur.set(1, Math.max(cur.get(1), next.get(1)));
                } else {
                    break;
                }
            }
            ins.add(i, cur);
        } else {
            ins.add(i, Arrays.stream(newInterval).boxed().collect(Collectors.toList()));
        }
//        System.out.println(ins);

        int[][] res = new int[ins.size()][2];
        for(int j=0 ; j<res.length ; j++) {
            res[j] = ins.get(j).stream().mapToInt(Integer::valueOf).toArray();
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}