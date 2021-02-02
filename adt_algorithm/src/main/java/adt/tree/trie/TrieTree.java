package adt.tree.trie;

import java.util.Map;

/**
 * 字典树
 */
public interface TrieTree {

    /**
     * 加入单词
     *
     * @param word
     */
    void insert(String word);

    /**
     * 给定单词出现次数
     *
     * @param word
     * @return
     */
    int count(String word);

    /**
     * 给定前缀出现次数
     *
     * @param prefix
     * @return
     */
    int countPrefix(String prefix);

    /**
     * 单词个数
     */
    int words();

    /**
     * 最长公共前缀
     *
     * @return
     */
    String commonPrefix();

    /**
     * 词频统计(各单词出现次数)
     *
     * @return
     */
    Map<String, Integer> wordsFrequency();

}
