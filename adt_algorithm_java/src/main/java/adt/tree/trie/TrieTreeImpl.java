package adt.tree.trie;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * 字典树基本实现
 */
public class TrieTreeImpl implements TrieTree {

    /**
     * 内部节点类
     */
    private static class Node {
        int count;
        char c;
        Map<Character, Node> children; // 透过 Map 的哈希映射来避免顺序查找所有字串

        Node(char c) {
            this.c = c;
            this.children = new HashMap<>();
        }

        void tree(String prefix) {
            System.out.println(prefix + c + (count > 0 ? ":" + count : ""));
            prefix = "  " + prefix;
            for (Node child : children.values()) {
                child.tree(prefix);
            }
        }
    }

    private Node root;
    private int words;

    public TrieTreeImpl() {
        this.root = new Node('/');
    }

    public static TrieTreeImpl from(String[] words) {
        TrieTreeImpl tree = new TrieTreeImpl();
        for (String word : words) {
            tree.insert(word);
        }
        return tree;
    }

    @Override
    public void insert(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            if (!cur.children.containsKey(c)) {
                // 路径上节点不存在则建立新的节点
                cur.children.put(c, new Node(c));
            }
            cur = cur.children.get(c);
        }
        // 字符串结尾处 count 递增，表示该单词数量 +1
        cur.count += 1;
        words += 1;
    }

    @Override
    public int words() {
        return words;
//        return countWords(root);
    }

    @Override
    public int count(String word) {
        Node node = getNode(word);
        return node == null ? 0 : node.count;
    }

    /**
     * 查找目标单词结尾节点
     *
     * @param word
     * @return
     */
    private Node getNode(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            if (!cur.children.containsKey(c)) return null;
            cur = cur.children.get(c);
        }
        return cur;
    }

    @Override
    public int countPrefix(String prefix) {
        Node node = getNode(prefix);
        return node == null ? 0 : countWords(node);
    }

    /**
     * 计算给定节点之下所有单词数量
     *
     * @param node
     * @return
     */
    private int countWords(Node node) {
        if (node == null) return 0;
        int res = node.count;
        for (Node child : node.children.values()) {
            res += countWords(child);
        }
        return res;
    }

    @Override
    public String commonPrefix() {
        StringBuilder prefix = new StringBuilder();
        Node cur = root;
        // 只存在单一子节点则为所有单词公共前缀
        // count > 0 表示单词结尾
        while (cur.count == 0 && cur.children.keySet().size() == 1) {
            cur = new ArrayList<>(cur.children.values()).get(0);
            prefix.append(cur.c);
        }
        return prefix.toString();
    }

    @Override
    public Map<String, Integer> wordsFrequency() {
        Map<String, Integer> freq = new HashMap<>();
        dfs(root, "", freq);
        return freq;
    }

    /**
     * 深度优先遍历计算词频
     *
     * @param node
     * @param word
     * @param freq
     */
    private void dfs(Node node, String word, Map<String, Integer> freq) {
        if (node.count > 0) freq.put(word, node.count); // count > 0 表示有单词
        for (Node child : node.children.values()) {
            dfs(child, word + child.c, freq);
        }
    }

    @Override
    public String toString() {
        System.out.println("TrieTreeImpl:");
        root.tree("");
        return "";
    }
}
