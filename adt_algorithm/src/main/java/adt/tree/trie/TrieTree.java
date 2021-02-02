package adt.tree.trie;

import java.util.Map;

public interface TrieTree {

    /**
     * 加入字符串
     *
     * @param word
     */
    void insert(String word);

    /**
     * 给定字符串出现次数
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
     * 返回现有字符串个数
     */
    int words();

    /**
     * 最长公共前缀
     *
     * @return
     */
    String commonPrefix();

    /**
     * 给出所有字符串出现次数
     *
     * @return
     */
    Map<String, Integer> wordsFrequency();

}
