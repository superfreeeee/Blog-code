package algorithm.string;

import org.junit.Test;

import static org.junit.Assert.*;

public class LongestCommonPrefixTest {

    @Test
    public void test_byTrieTree() {
        String[] words = new String[]{"flower", "flow", "flight", "flow"};
        String ans = "fl";
        assertEquals(ans, LongestCommonPrefix.byTrieTree(words));
        words = new String[]{"banana", "band", "bbc", "ba"};
        ans = "b";
        assertEquals(ans, LongestCommonPrefix.byTrieTree(words));
    }
}