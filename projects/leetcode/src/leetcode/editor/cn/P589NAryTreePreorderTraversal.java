package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P589NAryTreePreorderTraversal {
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

        private List<Integer> res;

        public List<Integer> preorder(Node root) {
            res = new ArrayList<>();
            _preorder(root);
            return res;
        }

        private void _preorder(Node n) {
            if(n != null) {
                res.add(n.val);
                for(Node child : n.children) {
                    _preorder(child);
                }
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}