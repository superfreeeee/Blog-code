package leetcode.editor.cn;

import java.util.Stack;

public class P1598CrawlerLogFolder {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int minOperations(String[] logs) {
        int count = 0;
        for(String log : logs) {
            if(log.equals("../")) {
                count = count > 0 ? count - 1 : 0;
            } else if(!log.equals("./")) {
                count++;
            }
        }
        return count;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
