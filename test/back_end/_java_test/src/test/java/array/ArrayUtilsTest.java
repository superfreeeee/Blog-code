package array;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class ArrayUtilsTest {

    @Test
    public void concat1() {
        char[] a = "12345".toCharArray();
        char[] b = "67890".toCharArray();

        char[] c = ArrayUtils.concat(a, b);
        System.out.println(Arrays.toString(c));
    }

    @Test
    public void concat2() {
        String s1 = "12345";
        String s2 = "67890";

        char[] chars = ArrayUtils.concat(s1, s2);
        System.out.println(Arrays.toString(chars));
    }
}