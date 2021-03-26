package algorithm.string;

import adt.tree.trie.TrieTree;
import adt.tree.trie.TrieTreeImpl;

/**
 * 最长公共前缀
 */
public class LongestCommonPrefix {

    /**
     * 使用 TrieTree 实现
     * @param words
     * @return
     */
    public static String byTrieTree(String[] words) {
        TrieTree trieTree = TrieTreeImpl.from(words);
        return trieTree.commonPrefix();
    }
}
