package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class P559MaximumDepthOfNAryTree {
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
        public int maxDepth(Node root) {
            if(root == null) return 0;
            List<Integer> chs = new ArrayList<>();
            for(Node child : root.children) chs.add(maxDepth(child));
            return max(chs) + 1;
        }

        private int max(List<Integer> nums) {
            if(nums.size() == 0) return 0;
            int res = nums.get(0);
            for(int num : nums) {
                if(num > res) res = num;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}