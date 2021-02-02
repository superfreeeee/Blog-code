package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P430FlattenAMultilevelDoublyLinkedList {
    public static void main(String[] args) {
    }

    class Node {
        public int val;
        public Node prev;
        public Node next;
        public Node child;
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/*
// Definition for a Node.
class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};
*/

    class Solution {
        public Node flatten(Node head) {
//            print(head);
            if(head == null) return null;
            return _flatten(head)[0];
        }

        private Node[] _flatten(Node head) {
            Node[] res = new Node[]{head, head};
            Node next = head.next, child = head.child;
            head.next = head.child = null;
            if (child != null) {
                Node[] mid = _flatten(child);
                connect(res[1], mid[0]);
                res[1] = mid[1];
            }
            if(next != null) {
                Node[] rest = _flatten(next);
                connect(res[1], rest[0]);
                res[1] = rest[1];
            }
            return res;
        }

        private void connect(Node n1, Node n2) {
            n1.next = n2;
            n2.prev = n1;
        }

        private void print(Node n) {
            List<Node> children = new ArrayList<>();
            while(n != null) {
                System.out.print(n.val + "->");
                if(n.child != null) children.add(n.child);
                n = n.next;
            }
            System.out.println();
            for(Node child : children) {
                print(child);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}