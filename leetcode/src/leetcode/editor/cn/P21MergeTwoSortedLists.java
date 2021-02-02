package leetcode.editor.cn;

public class P21MergeTwoSortedLists {
    public static void main(String[] args) {
    }

    public class ListNode {
        int val;
        ListNode next;

        ListNode() {
        }

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode() {}
     * ListNode(int val) { this.val = val; }
     * ListNode(int val, ListNode next) { this.val = val; this.next = next; }
     * }
     */
    class Solution {
        public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
            ListNode head = new ListNode(0);
            ListNode cur = head;
            while(l1 != null || l2 != null) {
                if(l1 == null) {
                    cur = cur.next = l2;
                    l2 = l2.next;
                } else if(l2 == null) {
                    cur = cur.next = l1;
                    l1 = l1.next;
                } else {
                    if(l1.val < l2.val) {
                        cur = cur.next = l1;
                        l1 = l1.next;
                    } else {
                        cur = cur.next = l2;
                        l2 = l2.next;
                    }
                }
            }

            return head.next;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
