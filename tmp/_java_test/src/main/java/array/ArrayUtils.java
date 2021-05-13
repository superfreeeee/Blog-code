package array;

import java.util.Arrays;

public class ArrayUtils {

    public static char[] concat(char[]... arrs) {
        StringBuilder sb = new StringBuilder();
        for (char[] arr : arrs) {
            sb.append(arr);
        }
        return sb.toString().toCharArray();
    }

    public static char[] concat(String... strs) {
        StringBuilder sb = new StringBuilder();
        for (String str : strs) {
            sb.append(str);
        }
        return sb.toString().toCharArray();
    }
}
