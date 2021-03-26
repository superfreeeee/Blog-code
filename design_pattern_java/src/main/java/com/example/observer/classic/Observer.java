package com.example.observer.classic;

public abstract class Observer {

    private Subject subject;

    protected Observer(Subject subject) {
        this.subject = subject;
    }

    /**
     * 更新
     */
    public abstract void update();

    public State getState() {
        return subject.getState();
    }
}
