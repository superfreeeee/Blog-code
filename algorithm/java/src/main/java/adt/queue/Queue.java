package adt.queue;

/**
 * 队列
 * @param <T>
 */
public interface Queue<T> {

    /**
     * 入队
     * @param t
     */
    void enqueue(T t);

    /**
     * 出队
     * @return
     */
    T dequeue();

    /**
     * 获取队首元素
     * @return
     */
    T getFirst();

    /**
     * 获取队尾元素
     * @return
     */
    T getLast();

    /**
     * 判断队列是否为空
     * @return
     */
    boolean empty();

    /**
     * 查看细节
     */
    void info();
}
