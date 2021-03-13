package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class P901OnlineStockSpan {
    public static void main(String[] args) {
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class StockSpanner {

    public StockSpanner() {
        days = new Stack<>();
        prices = new ArrayList<>();
        days.push(0);
        prices.add(Integer.MAX_VALUE);
        current = 0;
    }

    private Stack<Integer> days;
    private List<Integer> prices;
    private int current;
    
    public int next(int price) {
        while(prices.get(days.peek()) <= price) {
            days.pop();
        }
        int gap = ++current - days.peek();
        days.push(current);
        prices.add(price);
        return gap;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner obj = new StockSpanner();
 * int param_1 = obj.next(price);
 */
//leetcode submit region end(Prohibit modification and deletion)

}
