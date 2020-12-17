package leetcode.editor.cn;

public class P725SplitLinkedListInParts {
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
        public ListNode[] splitListToParts(ListNode root, int k) {
            int size = 0;
            ListNode cur = root, tmp;
            while(cur != null) {
                size++;
                cur = cur.next;
            }
            if(k >= size) {
                ListNode[] res = new ListNode[k];
                cur = root;
                for(int i=0 ; i<size ; i++) {
                    res[i] = cur;
                    cur = cur.next;
                    res[i].next = null;
                }
                return res;
            }
            int m = size / k;
            int n = size - m * k;
            ListNode[] res = new ListNode[k];
            cur = root;
            for(int i=0 ; i<k ; i++) {
                res[i] = cur;
                if(i == k - 1) break;
                for(int j=1 ; j<m ; j++) cur = cur.next;
                if(i < n) cur = cur.next;
                tmp = cur.next;
                cur.next = null;
                cur = tmp;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}