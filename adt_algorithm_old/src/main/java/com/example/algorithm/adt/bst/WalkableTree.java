package com.example.algorithm.adt.bst;

public interface WalkableTree {

    /**
     * 中序遍歷
     */
    String inorderWalk();

    /**
     * 先序遍歷
     */
    String preorderWalk();

    /**
     * 後序遍歷
     */
    String postorderWalk();
}
