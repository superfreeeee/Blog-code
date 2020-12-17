package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P429NAryTreeLevelOrderTraversal {
    public static void main(String[] args) {
    }

    class Node {
        public int val;
        public List<Node> children;

        public Node() {
        }

        public Node(int _val) {
            val = _val;
        }

        public Node(int _val, List<Node> _children) {
            val = _val;
            children = _children;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/

    class Solution {
        public List<List<Integer>> levelOrder(Node root) {
            List<List<Integer>> res = new ArrayList<>();
            if(root == null) return res;
            Queue<Node> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                List<Integer> layer = new ArrayList<>();
                int size = Q.size();
                while(size-- > 0) {
                    Node node = Q.poll();
                    layer.add(node.val);
                    for(Node child : node.children) Q.add(child);
                }
                res.add(layer);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
