package adt.tree.rb;

import adt.tree.bst.BinarySearchTree;

public interface RedBlackTree<K extends Comparable<K>, T> extends BinarySearchTree<K, T> {

    /**
     * 检查红黑树性质
     * @return
     */
    void validate();
}
