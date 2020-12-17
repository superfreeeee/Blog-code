package leetcode.editor.cn;

public class P1171RemoveZeroSumConsecutiveNodesFromLinkedList {
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
        private boolean flag = true;

        public ListNode removeZeroSumSublists(ListNode head) {
//            print(head);
            if (head == null) return null;
            if (head.val == 0) {
                flag = true;
                return removeZeroSumSublists(head.next);
            }
            while(true) {
                flag = false;
                int sum = head.val;
                ListNode cur = head.next;
                while (cur != null) {
                    if ((sum += cur.val) == 0) {
                        flag = true;
                        return removeZeroSumSublists(cur.next);
                    }
                    cur = cur.next;
                }
                ListNode child = removeZeroSumSublists(head.next);
                head.next = child;
                if(!flag) break;
            }
            return head;
        }

        private void print(ListNode l) {
            while(l != null) {
                System.out.print(l.val + "->");
                l = l.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}