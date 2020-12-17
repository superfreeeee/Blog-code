package leetcode.editor.cn;

import java.util.*;
import java.util.stream.Collectors;

public class P817LinkedListComponents {
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

        public int numComponents(ListNode head, int[] G) {
            Set<Integer> set = new HashSet<>(Arrays.stream(G).boxed().collect(Collectors.toList()));
            ListNode cur = head;
            boolean found = false;
            int ans = 0;
            while (cur != null) {
                if (set.contains(cur.val)) found = true;
                else {
                    if (found) ans++;
                    found = false;
                }
                cur = cur.next;
            }
            if(found) ans++;
            return ans;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}