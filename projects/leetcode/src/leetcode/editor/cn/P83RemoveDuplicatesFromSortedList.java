package leetcode.editor.cn;

public class P83RemoveDuplicatesFromSortedList {
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
        public ListNode deleteDuplicates(ListNode head) {
            if(head == null || head.next == null) return head;
            ListNode pre = head, cur = head.next;
            while(cur != null) {
                while(cur != null && cur.val == pre.val) cur = cur.next;
                pre = pre.next = cur;
                if(pre == null) return head;
                cur = pre.next;
            }
            return head;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}