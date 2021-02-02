package leetcode.editor.cn;

import java.util.*;

public class P726NumberOfAtoms {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public String countOfAtoms(String formula) {
            int n = formula.length();
            Stack<Map<String, Integer>> stack = new Stack<>();
            stack.push(new TreeMap<>());
            for(int i=0 ; i<n ; ) {
                if(formula.charAt(i) == '(') {
                    stack.push(new TreeMap<>());
                    i++;
                } else if(formula.charAt(i) == ')') {
                    Map<String, Integer> recent = stack.pop();
                    int time = 1, i0 = ++i;
                    while(i < n && Character.isDigit(formula.charAt(i))) i++;
                    if(i > i0) time = Integer.parseInt(formula.substring(i0, i));

                    Map<String, Integer> top = stack.peek();
                    for(String key : recent.keySet()) {
                        top.put(key, top.getOrDefault(key, 0) + recent.get(key) * time);
                    }
                } else {
                    int i0 = i++;
                    while(i < n && Character.isLowerCase(formula.charAt(i))) i++;
                    String atom = formula.substring(i0, i);

                    int time = 1; i0 = i;
                    while(i < n && Character.isDigit(formula.charAt(i))) i++;
                    if(i > i0) time = Integer.parseInt(formula.substring(i0, i));

                    Map<String, Integer> top = stack.peek();
                    top.put(atom, top.getOrDefault(atom, 0) + time);
                }
            }
            StringBuilder res = new StringBuilder();
            Map<String, Integer> rest = stack.peek();
            for(String key : rest.keySet()) {
                res.append(key);
                if(rest.get(key) > 1) {
                    res.append(rest.get(key));
                }
            }
            return res.toString();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
