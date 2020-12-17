package leetcode.editor.cn;

public class P1290ConvertBinaryNumberInALinkedListToInteger {
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
        public int getDecimalValue(ListNode head) {
            if(head == null) return 0;
            int res = 0;
            while(head != null) {
                res = res * 2 + head.val;
                head = head.next;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}