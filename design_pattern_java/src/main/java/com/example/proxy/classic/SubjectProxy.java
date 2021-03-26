package com.example.proxy.classic;

public class SubjectProxy implements Subject {

    private Subject subject;

    public SubjectProxy(Subject subject) {
        this.subject = subject;
    }

    private void prefix() {
        System.out.print("[Subject Proxy]");
    }

    @Override
    public void f() {
        prefix();
        subject.f();
    }

    @Override
    public void g() {
        prefix();
        subject.g();
    }
}
