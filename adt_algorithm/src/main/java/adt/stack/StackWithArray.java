package adt.stack;

public class StackWithArray<T> implements Stack<T> {
    public StackWithArray() {
        this(1);
    }

    public StackWithArray(int size) {
        this.top = -1;
        this.size = size;
        this.array = (T[]) new Object[size];
    }

    private T[] array;
    private int size;
    private int top;

    /**
     * 压栈
     *
     * @param t
     */
    @Override
    public void push(T t) {
        if (top == size - 1) extend();
        array[++top] = t;
    }

    /**
     * 出栈
     *
     * @return
     */
    @Override
    public T pop() {
        if (top < 0) return null;
        return array[top--];
    }

    /**
     * 获得栈顶元素
     *
     * @return
     */
    @Override
    public T top() {
        return array[top];
    }

    /**
     * 判断栈是否为空
     *
     * @return
     */
    @Override
    public boolean empty() {
        return top >= 0;
    }

    /**
     * 扩展数组大小
     */
    private void extend() {
        T[] newArray = (T[]) new Object[size * 2];
        for (int i = 0; i < size; i++) newArray[i] = array[i];
        array = newArray;
        size *= 2;
    }

    /**
     * 查看栈信息
     */
    @Override
    public void info() {
        System.out.print("Stack: {size=" + size + ", array: [");
        for(int i=0 ; i<=top ; i++) {
            if (i > 0) System.out.print(", ");
            System.out.print(array[i]);
        }
        java.util.Stack stack = new java.util.Stack();
        System.out.println("], top=" + top + "}");
    }
}
