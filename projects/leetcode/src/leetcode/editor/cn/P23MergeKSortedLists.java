package leetcode.editor.cn;

public class P23MergeKSortedLists {
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
        public ListNode mergeKLists(ListNode[] lists) {
            ListNode cur = new ListNode(Integer.MIN_VALUE);
            for(ListNode l : lists) {
                cur = merge(cur, l);
//                print(cur);
            }
            return cur.next;
        }

        private ListNode merge(ListNode a, ListNode b) {
            if(a == null) return b;
            if(b == null) return a;
            ListNode cur = a;
            while(b != null) {
                while(cur.next != null && cur.next.val < b.val) cur = cur.next;
                ListNode tmp = b.next;
                b.next = cur.next;
                cur = cur.next = b;
                b = tmp;
            }
            return a;
        }

        private void print(ListNode node) {
            while(node != null) {
                System.out.print(node.val + "->");
                node = node.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}