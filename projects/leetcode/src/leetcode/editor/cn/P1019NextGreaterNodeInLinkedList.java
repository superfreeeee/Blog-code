package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class P1019NextGreaterNodeInLinkedList {
    public static void main(String[] args) {
    }

    public class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
        }
    }

    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode(int x) { val = x; }
     * }
     */
    class Solution {
        public int[] nextLargerNodes(ListNode head) {
            Stack<Pair> stack = new Stack<>();
            List<Integer> res = new ArrayList<>();
            int i=0;
            while(head != null) {
                int cur = head.val;
                while(!stack.isEmpty() && stack.peek().val < cur) {
                    res.set(stack.pop().index, cur);
                }
                stack.push(new Pair(head.val, i++));
                res.add(0);
                head = head.next;
            }
            return res.stream().mapToInt(Integer::valueOf).toArray();
        }
    }

    class Pair {
        int val;
        int index;

        public Pair(int val, int index) {
            this.val = val;
            this.index = index;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
