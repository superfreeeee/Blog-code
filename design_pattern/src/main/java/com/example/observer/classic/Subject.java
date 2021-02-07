package com.example.observer.classic;

/**
 * 可订阅对象
 */
public interface Subject {

    /**
     * 订阅
     *
     * @param observer
     */
    void subscribe(Observer observer);

    /**
     * 取消订阅
     *
     * @param observer
     */
    void unsubscribe(Observer observer);

    /**
     * 发布事件
     */
    void publish();

    /**
     * 获取订阅对象状态
     *
     * @return
     */
    State getState();
}
