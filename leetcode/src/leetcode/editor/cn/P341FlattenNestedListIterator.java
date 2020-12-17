package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class P341FlattenNestedListIterator {
    public static void main(String[] args) {
    }
    public class NestedInteger {
        public boolean isInteger() {
            return false;
        }
        public Integer getInteger() {
            return null;
        }
        public List<NestedInteger> getList() {
            return null;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)
    /**
     * // This is the interface that allows for creating nested lists.
     * // You should not implement it, or speculate about its implementation
     * public interface NestedInteger {
     * <p>
     * // @return true if this NestedInteger holds a single integer, rather than a nested list.
     * public boolean isInteger();
     * <p>
     * // @return the single integer that this NestedInteger holds, if it holds a single integer
     * // Return null if this NestedInteger holds a nested list
     * public Integer getInteger();
     * <p>
     * // @return the nested list that this NestedInteger holds, if it holds a nested list
     * // Return null if this NestedInteger holds a single integer
     * public List<NestedInteger> getList();
     * }
     */
    public class NestedIterator implements Iterator<Integer> {

        private int index = 0;
        private List<Integer> list = new ArrayList<>();

        public NestedIterator(List<NestedInteger> nestedList) {
            extract(nestedList);
            System.out.println(list);
        }

        private void extract(List<NestedInteger> nestedList) {
            for (NestedInteger i : nestedList) {
                if (i.isInteger()) {
                    list.add(i.getInteger());
                } else {
                    extract(i.getList());
                }
            }
        }

        @Override
        public Integer next() {
            return list.get(index++);
        }

        @Override
        public boolean hasNext() {
            return index < list.size();
        }
    }

/**
 * Your NestedIterator object will be instantiated and called as such:
 * NestedIterator i = new NestedIterator(nestedList);
 * while (i.hasNext()) v[f()] = i.next();
 */

//leetcode submit region end(Prohibit modification and deletion)

}
