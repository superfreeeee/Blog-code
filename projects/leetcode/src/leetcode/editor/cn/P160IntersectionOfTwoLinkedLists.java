package leetcode.editor.cn;

public class P160IntersectionOfTwoLinkedLists {
    public static void main(String[] args) {
    }

    public class ListNode {
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
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode(int x) {
     * val = x;
     * next = null;
     * }
     * }
     */
    public class Solution {
        public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
            if(headA == null || headB == null) return null;
            ListNode a = headA, b = headB;
            boolean pa = false, pb = false;
            while(true) {
                if(a == b) return a;
                a = a.next;
                b = b.next;
                if(a == null) {
                    a = headB;
                    if(pa) return null;
                    pa = true;
                }
                if(b == null) {
                    b = headA;
                    if(pb) return null;
                    pb = true;
                }
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}