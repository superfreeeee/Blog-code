package leetcode.editor.cn;

import java.util.Stack;

public class P591TagValidator {
    public static void main(String[] args) {
        System.out.println("<![CDATA[ABC]]><TAG>sometext</TAG>".matches("(^<!\\[CDATA\\[.*\\]\\]>.*|.*<!\\[CDATA\\[.*]]>$)"));
        System.out.println("<![CDATA[ABC]]><TAG>sometext</TAG>".matches("^<!\\[CDATA\\[.*\\]\\]>.*"));
        System.out.println("<DIV>This is the first line <![CDATA[<div> <![cdata]> [[]]   ]]>  <DIV> <A>  <![CDATA[<b>]]>  </A>  <A> <C></C></A></DIV>    </DIV>".replaceAll("<!\\[CDATA\\[.*?\\]\\]>", ""));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private String s;
        private int index = 0;

        public boolean isValid(String code) {
            if(code.matches("(^<!\\[CDATA\\[.*]]>.*?|.*?<!\\[CDATA\\[.*]]>$)")) return false;
            code = code.replaceAll("<!\\[CDATA\\[.*?\\]\\]>", "");

            if (code.length() < 7 || code.charAt(0) != '<' || code.startsWith("<![CDATA[")) return false;
            boolean isTag = false, isCDATA = false;
            String tagName = "";
            String content = "";
            Stack<String> tags = new Stack<>();
            int meetZero = 0;
            for (char c : code.toCharArray()) {
                if (isCDATA) {
                    content += c;
                    if (content.endsWith("]]>")) {
                        content = "";
                        isCDATA = false;
                    }
                } else if (isTag) {
                    if (c != '>') {
                        tagName += c;
                        if(tagName.equals("![CDATA[")) {
                            isCDATA = true;
                            isTag = false;
                            tagName = "";
                            content = "";
                        }
                    } else {
                        if (!tagName.matches("/?[A-Z]{1,9}")) return false;
                        if (tagName.charAt(0) == '/') {
                            if(tags.isEmpty()) return false;
                            String startTag = tags.pop();
                            if (!tagName.substring(1).equals(startTag)) return false;
                            if(tags.isEmpty()) meetZero++;
                        } else {
                            tags.push(tagName);
                        }
                        tagName = "";
                        isTag = false;
                    }
//                    System.out.println(isCDATA + "-" + isTag + "-" + tagName + "-" + content);
//                    System.out.println(tags);
                } else if (c == '<') {
                    content = "";
                    isTag = true;
                } else {
                    content += c;
                }
            }
            return !isCDATA && !isTag && tags.empty() && content.length() == 0 && meetZero == 1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
