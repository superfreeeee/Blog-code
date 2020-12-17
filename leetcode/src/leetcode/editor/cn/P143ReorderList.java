package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P143ReorderList {
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
        private Map<ListNode, ListNode> previous = new HashMap<>();

        public void reorderList(ListNode head) {
            int len = 0;
            ListNode pre = null;
            ListNode cur = head;
            while (cur != null) {
                len++;
                previous.put(cur, pre);
                pre = cur;
                cur = cur.next;
            }
            cur = head;
            for (int i = 0, endi = (len - 1) / 2; i < endi; i++) {
                ListNode tmp = previous.get(pre);
                pre.next = cur.next;
                cur.next = pre;
                cur = pre.next;
                pre = tmp;
                pre.next = null;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}