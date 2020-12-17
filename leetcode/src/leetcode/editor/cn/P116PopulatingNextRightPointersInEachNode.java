package leetcode.editor.cn;

import java.util.LinkedList;
import java.util.Queue;

public class P116PopulatingNextRightPointersInEachNode {
    public static void main(String[] args) {
    }

    class Node {
        public int val;
        public Node left;
        public Node right;
        public Node next;

        public Node() {
        }

        public Node(int _val) {
            val = _val;
        }

        public Node(int _val, Node _left, Node _right, Node _next) {
            val = _val;
            left = _left;
            right = _right;
            next = _next;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

    class Solution {
        public Node connect(Node root) {
            if(root == null) return null;
            Queue<Node> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                int size = Q.size();
                Q.add(null);
                while(size-- > 0) {
                    Node n = Q.poll();
                    n.next = Q.peek();
                    if(n.left != null) {
                        Q.add(n.left);
                        Q.add(n.right);
                    }
                }
                Q.poll();
            }
            return root;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
