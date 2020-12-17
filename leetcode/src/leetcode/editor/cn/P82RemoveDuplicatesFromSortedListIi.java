package leetcode.editor.cn;

public class P82RemoveDuplicatesFromSortedListIi {
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
            if(head.val == head.next.val) {
                ListNode cur = head;
                while(cur != null && cur.val == head.val) cur = cur.next;
                return deleteDuplicates(cur);
            }
            head.next = deleteDuplicates(head.next);
            return head;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}