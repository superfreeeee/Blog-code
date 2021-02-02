package adt.tree.trie;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class TrieTreeTest {

    @Test
    public void test_1() {
        TrieTree trieTree = TrieTreeImpl.from(new String[]{"flower", "flow", "flight", "flow"});
        System.out.println(trieTree);
        assertEquals(4, trieTree.words());
        assertEquals(2, trieTree.count("flow"));
        assertEquals(1, trieTree.count("flower"));
        assertEquals(0, trieTree.count("flowerer"));
        assertEquals(4, trieTree.countPrefix("fl"));
        assertEquals(3, trieTree.countPrefix("flo"));
        assertEquals(1, trieTree.countPrefix("fligh"));
        assertEquals(0, trieTree.countPrefix("flighe"));
        assertEquals("fl", trieTree.commonPrefix());
        System.out.println(trieTree.wordsFrequency());
    }

    @Test
    public void test_from() {
        String[][] wordsList = new String[][]{
                new String[]{},
                new String[]{"flower", "flow", "flight", "flow"},
                new String[]{"dog", "racecar", "car"},
                new String[]{"banana", "band", "apple", "apt", "bbc", "app", "ba"},
        };
        for (String[] words : wordsList) {
            System.out.println("words: " + Arrays.toString(words));
            System.out.println(TrieTreeImpl.from(words));
        }
    }

    @Test
    public void test_insert() {
        String[] words = new String[]{"banana", "band", "apple", "apt", "bbc", "app", "ba", "bat"};
        TrieTree trieTree = new TrieTreeImpl();
        System.out.println(trieTree);
        for (String word : words) {
            System.out.println("append: \'" + word + '\'');
            trieTree.insert(word);
            System.out.println(trieTree);
        }
        System.out.println(trieTree.wordsFrequency());
    }
}