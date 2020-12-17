package leetcode.editor.cn;

import java.util.*;

public class P975OddEvenJump {
    public static void main(String[] args) {
        Solution solution = new P975OddEvenJump().new Solution();
//        System.out.println(solution.oddEvenJumps(new int[]{10, 13, 12, 14, 15}));
//        System.out.println(solution.oddEvenJumps(new int[]{1,2,3,4,2}));
        System.out.println(solution.oddEvenJumps(new int[]{1,2,1,2,1}));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int oddEvenJumps(int[] A) {
            int n = A.length;
            List<Integer> oddB = genIndex(n);
            Collections.sort(oddB, Comparator.comparingInt(l -> A[l]));
//            System.out.println(oddB);
            List<Integer> evenB = genIndex(n);
            Collections.sort(evenB, Comparator.comparingInt(l -> -A[l]));
//            System.out.println(evenB);

            int[] oddNext = make(oddB);
            int[] evenNext = make(evenB);

            System.out.println(Arrays.toString(oddNext));
            System.out.println(Arrays.toString(evenNext));

            int ans = 1;
            for(int i=0 ; i<n-1 ; i++) {
                int count = 0, cur = i;
                while(count < n*2) {
                    count++;
                    int recent = cur;
                    if(count % 2 == 0) {
                        cur = evenNext[cur];
                    } else {
                        cur = oddNext[cur];
                    }
                    if(cur <= recent) {
                        break;
                    }
                    if(cur == n-1) {
//                        System.out.println("i = " + i);
                        ans++;
                        break;
                    }
                }
            }

            return ans;
        }

        private List<Integer> genIndex(int n) {
            List<Integer> index = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                index.add(i);
            }
            return index;
        }

        private int[] make(List<Integer> B) {
            Stack<Integer> stack = new Stack<>();
            int[] res = new int[B.size()];
            for (int i : B) {
                while (!stack.isEmpty() && i > stack.peek()) {
                    res[stack.pop()] = i;
                }
                stack.push(i);
            }
            return res;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
