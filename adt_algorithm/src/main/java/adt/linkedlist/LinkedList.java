package adt.linkedlist;

/**
 * 链表
 *
 * @param <T>
 */
public interface LinkedList<T> {

    /**
     * 添加元素到尾部
     *
     * @param t
     */
    default void add(T t) {
        add(size(), t);
    }

    /**
     * 添加元素到指定下标
     *
     * @param index
     * @param t
     */
    void add(int index, T t);

    /**
     * 获取指定下标元素
     *
     * @param index
     * @return
     */
    T get(int index);

    /**
     * 获取第一个元素
     *
     * @return
     */
    default T getFirst() {
        return get(0);
    }

    /**
     * 获取最后一个元素
     *
     * @return
     */
    default T getLast() {
        return get(size() - 1);
    }

    /**
     * 移除指定下标元素
     *
     * @param index
     * @return
     */
    T remove(int index);

    /**
     * 移除第一个元素
     *
     * @return
     */
    default T removeFirst() {
        return remove(0);
    }

    /**
     * 移除最后一个元素
     *
     * @return
     */
    default T removeLast() {
        return remove(size() - 1);
    }

    /**
     * 获取链表大小
     *
     * @return
     */
    int size();

    /**
     * 判断链表是否为空
     *
     * @return
     */
    boolean empty();

}
