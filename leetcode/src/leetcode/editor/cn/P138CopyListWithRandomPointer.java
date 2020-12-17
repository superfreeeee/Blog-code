package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class P138CopyListWithRandomPointer {
    public static void main(String[] args) {
    }

    class Node {
        int val;
        Node next;
        Node random;

        public Node(int val) {
            this.val = val;
            this.next = null;
            this.random = null;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/

    class Solution {
        private List<Node> nodes = new ArrayList<>();
        private List<Node> result = new ArrayList<>();

        public Node copyRandomList(Node head) {
            Node cur = head;
            while (cur != null) {
                nodes.add(cur);
                result.add(new Node(cur.val));
                cur = cur.next;
            }
            result.add(null);
            for (int i = 0, endi = nodes.size(); i < endi; i++) {
                result.get(i).random = result.get(indexOf(nodes.get(i).random));
                result.get(i).next = result.get(i + 1);
            }
            return result.get(0);
        }

        private int indexOf(Node n) {
            if(n == null) return nodes.size();
            for(int i=0 ; i<nodes.size() ; i++) {
                if(nodes.get(i) == n) return i;
            }
            return -1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}