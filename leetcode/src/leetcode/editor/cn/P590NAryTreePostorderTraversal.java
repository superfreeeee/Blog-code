package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P590NAryTreePostorderTraversal {
    public static void main(String[] args) {
    }
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

    public List<Integer> postorder(Node root) {
        res = new ArrayList<>();
        _postorder(root);
        return res;
    }

    private void _postorder(Node n) {
        if(n != null) {
            for(Node child : n.children) {
                _postorder(child);
            }
            res.add(n.val);
        }
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}