package leetcode.editor.cn;

import java.util.Arrays;

public class P449SerializeAndDeserializeBst {
    public static void main(String[] args) {
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

        private StringBuilder serial;

        // Encodes a tree to a single string.
        public String serialize(TreeNode root) {
            if(root == null) return "";
            serial = new StringBuilder();
            preorder(root);
//            System.out.println(serial.substring(1));
            return serial.substring(1);
        }

        private void preorder(TreeNode t) {
            if(t != null) {
                serial.append(",");
                serial.append(t.val);
                preorder(t.left);
                preorder(t.right);
            }
        }

        // Decodes your encoded data to tree.
        public TreeNode deserialize(String data) {
            if(data.length() == 0) return null;
            int[] nums = Arrays.stream(data.split(",")).mapToInt(Integer::parseInt).toArray();
//            System.out.println(data);
            return build(nums, 0, nums.length - 1);
        }

        private TreeNode build(int[] nums, int l, int r) {
            if(l > r) return null;
            if(l == r) return new TreeNode(nums[l]);
            int val = nums[l];
            int i = l + 1;
            while(i <= r && nums[i] < val) i++;
            TreeNode root = new TreeNode(val);
            root.left = build(nums, l + 1, i - 1);
            root.right = build(nums, i, r);
            return root;
        }
    }

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
//leetcode submit region end(Prohibit modification and deletion)

}
