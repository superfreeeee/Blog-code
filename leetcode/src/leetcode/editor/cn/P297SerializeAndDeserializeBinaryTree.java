package leetcode.editor.cn;

import java.util.*;

public class P297SerializeAndDeserializeBinaryTree {
    public static void main(String[] args) {
//        String data = "[1,2,3,null,null,4,5]";
        String data = "[]";
        System.out.println(Arrays.toString(data.substring(1, data.length() - 1).split(",")));
        System.out.println(data.substring(1, data.length() - 1).split(",").length);
    }

    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) {
            val = x;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     * int val;
     * TreeNode left;
     * TreeNode right;
     * TreeNode(int x) { val = x; }
     * }
     */
    public class Codec {

        // Encodes a tree to a single string.
        public String serialize(TreeNode root) {
            if(root == null) return "[]";
            List<String> nums = new ArrayList<>();
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                TreeNode t = Q.poll();
                if(t == null) nums.add("null");
                else {
                    nums.add(String.valueOf(t.val));
                    Q.add(t.left);
                    Q.add(t.right);
                }
            }
            StringBuilder res = new StringBuilder();
            res.append("[");
            for(int i=0 ; i<nums.size() ; i++) {
                if(i > 0) res.append(",");
                res.append(nums.get(i));
            }
            res.append("]");
            return res.toString();
        }

        // Decodes your encoded data to tree.
        public TreeNode deserialize(String data) {
            if(data.equals("[]")) return null;
            TreeNode[] nodes = Arrays.stream(data.substring(1, data.length() - 1).split(","))
                    .map(i -> i.equals("null") ? null : new TreeNode(Integer.parseInt(i)))
                    .toArray(TreeNode[]::new);
            TreeNode root = nodes[0];
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            for(int i=1 ; i<nodes.length ; i++) {
                TreeNode t = Q.poll();
                t.left = nodes[i++];
                t.right = i < nodes.length ? nodes[i] : null;
                if(t.left != null) Q.add(t.left);
                if(t.right != null) Q.add(t.right);
            }
            return root;
        }
    }

// Your Codec object will be instantiated and called as such:
// Codec ser = new Codec();
// Codec deser = new Codec();
// TreeNode ans = deser.deserialize(ser.serialize(root));
//leetcode submit region end(Prohibit modification and deletion)

}
