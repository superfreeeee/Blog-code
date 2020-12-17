package com.example.algorithm.sorting;

/**
 * 順序統計量相關算法
 * 1. 最小值/最大值
 * 2. 第 i 小的值（依升序排序後第 i 個值）
 * 這邊都使用 int 類型作為關鍵字指導思想，具體需要根據不同對象作出調整
 */
public class OrderStatistics {

    public static int minimum(int[] nums) {
        int res = Integer.MAX_VALUE;
        for(int num : nums) {
            if(num < res) {
                res = num;
            }
        }
        return res;
    }

    public static int maximum(int[] nums) {
        int res = Integer.MIN_VALUE;
        for(int num : nums) {
            if(num > res) {
                res = num;
            }
        }
        return res;
    }
}
