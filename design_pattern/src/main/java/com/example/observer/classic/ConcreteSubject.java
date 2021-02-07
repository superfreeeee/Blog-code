package com.example.observer.classic;

import java.util.ArrayList;
import java.util.List;

public class ConcreteSubject implements Subject {

    private State state;
    private List<Observer> observers;

    public ConcreteSubject() {
        this.state = State.Sleep;
        this.observers = new ArrayList<>();
    }

    public void nextState() {
        switch (state) {
            case Sleep:
                state = State.Ready;
                break;
            case Ready:
                state = State.Run;
                break;
            case Run:
                state = State.Sleep;
                break;
        }
        publish();
    }

    @Override
    public State getState() {
        return state;
    }

    @Override
    public void subscribe(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void unsubscribe(Observer observer) {
        if (observers.contains(observer)) {
            observers.remove(observer);
        }
    }

    @Override
    public void publish() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}
