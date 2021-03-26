package com.example.observer.classic;

import org.junit.Test;

import static org.junit.Assert.*;

public class ObserverTest {

    @Test
    public void test() {
        System.out.println(1);

        ConcreteSubject subject = new ConcreteSubject();
        Observer observer1 = ConcreteObserver.init(subject);
        Observer observer2 = ConcreteObserver.init(subject);
        subject.nextState();

        System.out.println(2);

        Observer observer3 = ConcreteObserver.init(subject);
        subject.nextState();

        System.out.println(3);

        subject.unsubscribe(observer2);
        subject.unsubscribe(observer1);
        subject.nextState();

        System.out.println(4);

        subject.unsubscribe(observer3);
        subject.nextState();

        System.out.println(5);
    }
}