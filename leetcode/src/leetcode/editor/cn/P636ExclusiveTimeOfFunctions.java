package leetcode.editor.cn;

import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class P636ExclusiveTimeOfFunctions {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] exclusiveTime(int n, List<String> logs) {
            int[] time = new int[n];
            Stack<Log> records = new Stack<>();
            for (String log : logs) {
                Log l = new Log(log);
                if (l.status.equals("start")) {
                    records.push(l);
                } else {
                    Log recent = records.pop();
                    int inc = l.time - recent.time - recent.share + 1;
                    time[recent.id] += inc;
                    if(!records.empty()) {
                        records.peek().share += l.time - recent.time + 1;
                    }
                }
//                System.out.println(records);
//                System.out.println(Arrays.toString(time));
            }
            return time;
        }

        private class Log {
            int id;
            String status;
            int time;
            int share = 0;
            Log(String log) {
                String[] task = log.split(":");
                id = Integer.parseInt(task[0]);
                status = task[1];
                time = Integer.parseInt(task[2]);
            }
            public String toString() {
                return "{" + id + ", " + status + ", " + time + ", " + share + "}";
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
