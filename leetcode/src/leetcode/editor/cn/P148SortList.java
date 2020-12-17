package leetcode.editor.cn;

public class P148SortList {
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
        public ListNode sortList(ListNode head) {
            return sort(head, size(head));
        }

        private ListNode sort(ListNode left, int size) {
            if(size <= 1) return left;
            ListNode right = divide(left, size / 2);
            left = sort(left, size / 2);
            right = sort(right, size - size / 2);
            return merge(left, right);
        }

        private ListNode divide(ListNode node, int size) {
            int count = 1;
            while (count < size) {
                count++;
                node = node.next;
            }
            ListNode res = node.next;
            node.next = null;
            return res;
        }

        private ListNode merge(ListNode left, ListNode right) {
            ListNode head = new ListNode(0);
            ListNode cur = head;
            while (left != null || right != null) {
                if (left == null) {
                    cur = cur.next = right;
                    right = right.next;
                } else if (right == null) {
                    cur = cur.next = left;
                    left = left.next;
                } else {
                    if (left.val < right.val) {
                        cur = cur.next = left;
                        left = left.next;
                    } else {
                        cur = cur.next = right;
                        right = right.next;
                    }
                }
            }
            return head.next;
        }

        private int size(ListNode t) {
            int i = 0;
            while (t != null) {
                t = t.next;
                i++;
            }
            return i;
        }

        private void print(ListNode t) {
            while(t != null) {
                System.out.print(t.val + "->");
                t = t.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}