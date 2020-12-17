package leetcode.editor.cn;

import java.util.Stack;

public class P234PalindromeLinkedList {
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
        public boolean isPalindrome(ListNode head) {
            if(head == null || head.next == null) return true;
            int size = 0;
            ListNode cur = head, other = head;
            while(cur != null) {
                cur = cur.next;
                size++;
            }
            for (int i = 0, endi = (size + 1) / 2; i < endi; i++) other = other.next;
            cur = head;
            other = reverse(other)[0];
            while(other != null) {
                if(cur.val != other.val) return false;
                cur = cur.next;
                other = other.next;
            }
            return true;
        }

        private ListNode[] reverse(ListNode n) {
            if(n.next == null) return new ListNode[]{n, n};
            ListNode[] res = reverse(n.next);
            n.next = null;
            res[1] = res[1].next = n;
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}