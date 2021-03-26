package adt.stack;

/**
 * 栈
 * @param <T>
 */
public interface Stack<T> {

    /**
     * 压栈
     * @param t
     */
    void push(T t);

    /**
     * 出栈
     * @return
     */
    T pop();

    /**
     * 获得栈顶元素
     * @return
     */
    T top();

    /**
     * 判断栈是否为空
     * @return
     */
    boolean empty();

    /**
     * 查看栈信息
     */
    void info();
}
