package leetcode.editor.cn;

public class P169MajorityElement {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int majorityElement(int[] nums) {
            if (nums.length < 1) return -1;
            return majorityElement(nums, 0, nums.length - 1);
        }

        private int majorityElement(int[] nums, int l, int r) {
            if (l == r) return nums[l];
            int mid = (l + r) / 2;
            int L = majorityElement(nums, l, mid);
            int R = majorityElement(nums, mid + 1, r);
            if (L == R) return L;
            int countL = count(nums, L, l, r);
            int countR = count(nums, R, l, r);
            return countL > countR ? L : R;
        }

        private int count(int[] nums, int num, int l, int r) {
            int res = 0;
            for (int i = l; i <= r; i++) {
                if (nums[i] == num) res++;
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}