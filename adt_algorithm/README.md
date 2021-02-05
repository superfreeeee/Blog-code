# ADT & Algorithm 抽象数据结构 & 算法

[TOC]

## ADT

### 1. Stack 栈(默认数组实现)

#### 1.1 StackWithArray 栈-数组实现[OK]

- [x] 基本实现

#### 1.2 StackWithLink 栈-链表实现

- [ ] 基本实现

#### 1.3 MaxStack 最大栈

- [ ] 基本实现

#### 1.4 MinStack 最小栈

- [ ] 基本实现

### 2. Queue 队列

#### 2.1 QueueWithArray 数组实现[OK]

- [x] 基本实现

#### 2.2 QueueWithLink 链表实现

- [ ] 基本实现

### 3. LinkedList 链表

#### 3.1 LinkedListSingle 单向链表[OK]

- [x] 基本实现

#### 3.2 LinkedListDouble 双向链表[OK]

- [x] 基本实现

#### 3.3 LinkedListCircular 单向循环链表

- [ ] 基本实现

### 4. Heap 堆

#### 4.1 MaxHeapWithArray 最大堆-数组实现

- [ ] 基本实现

#### 4.2 MaxHeapWithLink 最大堆-链表实现

- [ ] 基本实现

#### 4.3 MinHeapWithArray 最小堆-数组实现

- [ ] 基本实现

#### 4.4 MinHeapWithLink 最小堆-链表实现

- [ ] 基本实现

### 5. Tree 树

#### 5.1 BinarySearchTree 二叉搜索树[OK]

- [x] 基本实现 search, minimum, maximum, predecessor, successor, insert, delete, height, empty, nodes, preorder, inorder, postorder, layerOrder
- [x] 优化 delete, transplant 逻辑, 增加 tree 接口
- [x] 开放部分 protected, 修改 insert, delete 方法返回节点

#### 5.2 AVLTree 平衡二叉搜索树[OK]

- [x] 基本实现平衡条件 balance, leftRotate, rightRotate

#### 5.3 TrieTree 字典树[OK]

- [x] 基本实现 insert, count, countPrefix, words, commonPrefix, wordsFrequency

#### 5.4 RedBlackTree 红黑树

- [ ] 基本实现

#### 5.5 BTree B树

- [ ] 基本实现

#### 5.6 BPlusTree B+树

- [ ] 基本实现

### 6. Graph 图

#### 6.1 DirectedGraphWithAdjList 有向图-临界表实现[OK]

- [x] 基本实现

#### 6.2 DirectedGraphWithAdjMatrix 有向图-临界矩阵实现[OK]

- [x] 基本实现

#### 6.3 UndirectedGraphWithAdjList 无向图-临界表实现

- [ ] 基本实现

#### 6.4 UndirectedGraphWithAdjMatrix 无向图-临界矩阵实现

- [ ] 基本实现

### 7. DisjointSet 并查集(不相交集合)

#### 7.1 DisjointSetForest 并查集-森林实现[OK]

- [x] 基本实现

## Algorithm

### 1. Sorting 排序算法

#### 1.1 InsertionSort 插入排序[OK]

- [x] 针对 `int[]` 实现

#### 1.2 MergeSort 归并排序[OK]

- [x] 针对 `int[]` 实现

#### 1.3 HeapSort 堆排序[OK]

- [x] 针对 `int[]` 实现

#### 1.4 QuickSort 快速排序[OK]

- [x] 针对 `int[]` 实现

#### 1.5 CountingSort 计数排序[OK]

- [x] 针对 `int[]` 实现

#### 1.6 RadixSort 基数排序

- [ ] 基本实现

#### 1.7 BucketSort 桶排序

- [ ] 基本实现

### 2. Select 选择算法

#### 2.1 SelectionKth 选第 k 小的数

- [ ] 基本实现

### 3. String 字符串算法

#### 3.1 LongestCommonPrefix 最长公共前缀[OK]

- [x] 使用 TrieTree 实现

### 4. Number 数字算法
