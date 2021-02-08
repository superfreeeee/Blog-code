package com.example.observer.classic;

import java.util.ArrayList;
import java.util.List;

public class ConcreteSubject extends Subject {

    private State state;

    public ConcreteSubject() {
        this.state = State.Sleep;
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

}
