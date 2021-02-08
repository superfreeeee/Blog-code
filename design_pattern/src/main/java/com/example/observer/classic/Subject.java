package com.example.observer.classic;

import java.util.ArrayList;
import java.util.List;

/**
 * 可订阅对象
 */
public abstract class Subject {

    private List<Observer> observers;

    protected Subject() {
        this.observers = new ArrayList<>();
    }

    /**
     * 订阅
     *
     * @param observer
     */
    public void subscribe(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    /**
     * 取消订阅
     *
     * @param observer
     */
    public void unsubscribe(Observer observer) {
        if (observers.contains(observer)) {
            observers.remove(observer);
        }
    }

    /**
     * 发布事件
     */
    public void publish() {
        for (Observer observer : observers) {
            observer.update();
        }
    }

    /**
     * 获取订阅对象状态
     *
     * @return
     */
    abstract State getState();
}
