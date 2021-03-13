package leetcode.editor.cn;

public class P328OddEvenLinkedList {
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
        public ListNode oddEvenList(ListNode head) {
            if (head == null || head.next == null) return head;
            ListNode odd = head, even = head.next, H = even;
            while(even != null && even.next != null) {
                odd = odd.next = even.next;
                even = even.next = even.next.next;
            }
            odd.next = H;
            return head;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}