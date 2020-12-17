package leetcode.editor.cn;

public class P61RotateList {
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
        public ListNode rotateRight(ListNode head, int k) {
            if(head == null) return null;
            int len = 1;
            ListNode cur = head;
            while(cur.next != null) {
                cur = cur.next;
                len++;
            }
            k = len - k % len;
            ListNode R = head;
            for(int i=1 ; i<k ; i++) R = R.next;
            cur.next = head;
            cur = R.next;
            R.next = null;
            return cur;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}