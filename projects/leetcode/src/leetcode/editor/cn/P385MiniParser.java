package leetcode.editor.cn;

import java.util.List;

public class P385MiniParser {
    public static void main(String[] args) {
    }

    public class NestedInteger {
        // Constructor initializes an empty nested list.
        public NestedInteger() {
        }

        // Constructor initializes a single integer.
        public NestedInteger(int value) {
        }

        // @return true if this NestedInteger holds a single integer, rather than a nested list.
        public boolean isInteger() {
            return false;
        }

        // @return the single integer that this NestedInteger holds, if it holds a single integer
        // Return null if this NestedInteger holds a nested list
        public Integer getInteger() {
            return null;
        }

        // Set this NestedInteger to hold a single integer.
        public void setInteger(int value) {
        }

        // Set this NestedInteger to hold a nested list and adds a nested integer to it.
        public void add(NestedInteger ni) {
        }

        // @return the nested list that this NestedInteger holds, if it holds a nested list
        // Return null if this NestedInteger holds a single integer
        public List<NestedInteger> getList() {
            return null;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * // This is the interface that allows for creating nested lists.
     * // You should not implement it, or speculate about its implementation
     * public interface NestedInteger {
     * // Constructor initializes an empty nested list.
     * public NestedInteger();
     * <p>
     * // Constructor initializes a single integer.
     * public NestedInteger(int value);
     * <p>
     * // @return true if this NestedInteger holds a single integer, rather than a nested list.
     * public boolean isInteger();
     * <p>
     * // @return the single integer that this NestedInteger holds, if it holds a single integer
     * // Return null if this NestedInteger holds a nested list
     * public Integer getInteger();
     * <p>
     * // Set this NestedInteger to hold a single integer.
     * public void setInteger(int value);
     * <p>
     * // Set this NestedInteger to hold a nested list and adds a nested integer to it.
     * public void add(NestedInteger ni);
     * <p>
     * // @return the nested list that this NestedInteger holds, if it holds a nested list
     * // Return null if this NestedInteger holds a single integer
     * public List<NestedInteger> getList();
     * }
     */
    class Solution {

        private int index;
        private String origin;

        public NestedInteger deserialize(String s) {
            origin = s;
            index = 0;
            if (s.length() <= 0) {
                return null;
            }
            if (s.charAt(0) == '[') {
                return parseList();
            } else {
                return parseInteger();
            }
        }

        private NestedInteger parseList() {
            System.out.println("parse List " + index);
            assert (origin.charAt(index++) == '[');
            NestedInteger list = new NestedInteger();
            int operand = 0;
            while (origin.charAt(index) != ']') {
                NestedInteger inner = (origin.charAt(index) == '[') ? parseList() : parseInteger();
                list.add(inner);
                if (index >= origin.length() || origin.charAt(index) != ',') {
                    break;
                }
                assert (origin.charAt(index++) == ',');
            }
            assert (origin.charAt(index++) == ']');
            return list;
        }

        private NestedInteger parseInteger() {
            System.out.println("parse Integer " + index);
            int num = 0;
            int sign = origin.charAt(index) == '-' ? -1 : 1;
            if (sign < 0) {
                index++;
            }
            while (index < origin.length() && isDigit(origin.charAt(index))) {
                num = num * 10 + (origin.charAt(index++) - '0');
            }
            return new NestedInteger(num * sign);
        }

        private boolean isDigit(char c) {
            return '0' <= c && c <= '9';
        }

    }

//leetcode submit region end(Prohibit modification and deletion)

}
