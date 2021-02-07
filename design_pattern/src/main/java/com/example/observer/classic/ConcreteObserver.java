package com.example.observer.classic;

public class ConcreteObserver implements Observer {

    private Subject subject;

    private ConcreteObserver() {
    }

    public static ConcreteObserver init(Subject subject) {
        ConcreteObserver observer = new ConcreteObserver();
        observer.subject = subject;
        subject.subscribe(observer);
        return observer;
    }

    @Override
    public void update() {
        State state = subject.getState();
        System.out.println(String.format("[Observer@%x update] getState: %s", this.hashCode(), state));
    }
}
