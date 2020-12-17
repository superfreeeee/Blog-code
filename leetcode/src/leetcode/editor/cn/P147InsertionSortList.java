package leetcode.editor.cn;

public class P147InsertionSortList {
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
        public ListNode insertionSortList(ListNode head) {
            if(head == null || head.next == null) return head;
            print(head);
            ListNode res = new ListNode(head.val);
            ListNode cur = head.next;
            while(cur != null) {
                res = insert(res, new ListNode(cur.val));
                cur = cur.next;
            }
//            print(res);
            return res;
        }

        private ListNode insert(ListNode head, ListNode t) {
//            print(head);
//            print(t);
            if(head.val > t.val) {
                t.next = head;
                return t;
            }
            ListNode cur = head;
            while(cur.next != null && cur.next.val <= t.val) cur = cur.next;
            t.next = cur.next;
            cur.next = t;
            return head;
        }

        private void print(ListNode t) {
            while(t != null) {
                System.out.print(t.val + "->");
                t = t.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}