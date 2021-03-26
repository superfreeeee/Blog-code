package com.example.observer.classic;

public class ConcreteObserver extends Observer {

    private ConcreteObserver(Subject subject) {
        super(subject);
    }

    public static ConcreteObserver init(Subject subject) {
        ConcreteObserver observer = new ConcreteObserver(subject);
        subject.subscribe(observer);
        return observer;
    }

    @Override
    public void update() {
        State state = getState();
        System.out.println(String.format("[Observer@%x update] getState: %s", this.hashCode(), state));
    }
}
