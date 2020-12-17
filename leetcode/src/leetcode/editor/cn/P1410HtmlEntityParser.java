package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P1410HtmlEntityParser {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public String entityParser(String text) {

        return text.replace("&quot;", "\"")
                .replace("&apos;", "'")
                .replace("&gt;", ">")
                .replace("&lt;", "<")
                .replace("&frasl;", "/")
                .replace("&amp;", "&");
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
