package leetcode.editor.cn;

import java.util.Arrays;

public class P331VerifyPreorderSerializationOfABinaryTree {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public boolean isValidSerialization(String preorder) {
            String[] nodes = preorder.split(",");
            System.out.println(Arrays.toString(nodes));
            int require = 1;
            for(int i=0 ; i<nodes.length ; i++) {
                String node = nodes[i];
                if(node.equals("#")) {
                    require--;
                } else {
                    require++;
                }
                System.out.println(node + " " + require);
                if(i < nodes.length - 1 && require <= 0) {
                    return false;
                }
            }
            return require == 0;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
