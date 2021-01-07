package org.example.os.utils;

public class Transformer32 {

    public static final int WORD_SIZE = 32;

    /**
     * 整数 转 无符号二进制整数
     *
     * @param num
     * @return
     */
    public static String decimalToBinary(int num) {
        char[] res = new char[WORD_SIZE];
        for (int i = 0; i < WORD_SIZE; i++) res[i] = '0';
        int p = WORD_SIZE;
        while (num > 0) {
            res[--p] = (char) (num % 2 + '0');
            num /= 2;
        }
        return String.valueOf(res);
    }

    /**
     * 无符号二进制整数 转 整数
     *
     * @param s
     * @return
     */
    public static int binaryToDecimal(String s) {
        int val = 0;
        for (char c : s.toCharArray()) {
            val = val * 2 + (c - '0');
        }
        return val;
    }

    public static void main(String[] args) {
        int val = 1;
        for (int i = 0; i < 9; i++) {
            System.out.println(Transformer32.decimalToBinary(val));
            val *= 10;
            System.out.println(Transformer32.binaryToDecimal(Transformer32.decimalToBinary(val)));
        }
    }
}
