package leetcode.editor.cn;

public class P86PartitionList {
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
        public ListNode partition(ListNode head, int x) {
            ListNode small = new ListNode(0);
            ListNode s = small;
            ListNode large = new ListNode(0);
            ListNode l = large;
            while(head != null) {
                if(head.val < x) s = s.next = head;
                else if(head.val >= x) l = l.next = head;
                head = head.next;
                s.next = l.next = null;
            }
            s.next = large.next;
            return small.next;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}