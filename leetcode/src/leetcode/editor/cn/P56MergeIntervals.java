package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class P56MergeIntervals {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[][] merge(int[][] intervals) {
            if (intervals.length == 0) return new int[][]{};
            sorted(intervals);
//            print(intervals);
            LinkedList<List<Integer>> saved = new LinkedList<>();

            for (int i = 0; i < intervals.length; i++) {
                List<Integer> cur = Arrays.stream(intervals[i]).boxed().collect(Collectors.toList());
                while (saved.size() > 0 && cur.get(0) <= saved.getLast().get(1)) {
                    List<Integer> pre = saved.pollLast();
                    cur.set(0, Math.min(cur.get(0), pre.get(0)));
                    cur.set(1, Math.max(cur.get(1), pre.get(1)));
                }
                saved.add(cur);
//                System.out.println(saved);
            }
//            System.out.println(saved);
            int[][] ans = new int[saved.size()][2];
            for (int i = 0; i < ans.length; i++) {
                ans[i] = saved.get(i).stream().mapToInt(Integer::valueOf).toArray();
            }
            return ans;
        }

        private void sorted(int[][] a) {
//            print(a);
            for (int i = 1; i < a.length; i++) {
                int p = i;
                int[] save = a[i];
                while (p > 0 && a[p - 1][0] > save[0]) {
                    a[p] = a[p - 1];
                    p--;
                }
                a[p] = save;
            }
//            print(a);
            for (int i = 1; i < a.length; i++) {
                int p = i;
                int[] save = a[i];
                while (p > 0 && a[p - 1][1] > save[1]) {
                    a[p] = a[p - 1];
                    p--;
                }
                a[p] = save;
            }
//            print(a);
        }

        private void print(int[][] a) {
            for (int[] p : a) {
                System.out.println(Arrays.toString(p));
            }
            System.out.println("--");
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}