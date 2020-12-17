package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P142LinkedListCycleIi {
    public static void main(String[] args) {
    }

    class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
            next = null;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * class ListNode {
     * int val;
     * ListNode next;
     * ListNode(int x) {
     * val = x;
     * next = null;
     * }
     * }
     */
    public class Solution {
        //        private List<ListNode> nodes = new ArrayList<>();
//        public ListNode detectCycle(ListNode head) {
//            while(head != null) {
//                if(nodes.contains(head)) return head;
//                nodes.add(head);
//                head = head.next;
//            }
//            return null;
//        }
        public ListNode detectCycle(ListNode head) {
            if(head == null) return null;
            ListNode fast = head.next;
            ListNode slow = head;
            while(fast != null && fast.next != null) {
                fast = fast.next.next;
                slow = slow.next;
                if(fast == slow) {
                    ListNode cur = head;
                    ListNode base = slow.next;
                    while(cur != base) {
                        cur = cur.next;
                        base = base.next;
                    }
                    return cur;
                }
            }
            return null;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}