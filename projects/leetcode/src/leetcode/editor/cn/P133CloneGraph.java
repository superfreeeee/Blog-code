package leetcode.editor.cn;

import java.util.*;

public class P133CloneGraph {
    public static void main(String[] args) {
    }
    class Node {
        public int val;
        public List<Node> neighbors;

        public Node() {
            val = 0;
            neighbors = new ArrayList<Node>();
        }

        public Node(int _val) {
            val = _val;
            neighbors = new ArrayList<Node>();
        }

        public Node(int _val, ArrayList<Node> _neighbors) {
            val = _val;
            neighbors = _neighbors;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

class Solution {
    private Map<Node, Node> mapper = new HashMap<>();

    public Node cloneGraph(Node node) {
        if(node == null) return null;
        if(mapper.containsKey(node)) return mapper.get(node);
        Node res = new Node(node.val);
        mapper.put(node, res);
        for(Node neighbor : node.neighbors) {
            res.neighbors.add(cloneGraph(neighbor));
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}