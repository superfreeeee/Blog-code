#include <iostream>

using namespace std;

int global_id = 0;

class Object {
public:
    Object() : id(global_id++) {
        cout << "Constructor(" << id << ")" << endl;
    }

    Object(const Object &object) : id(object.id + 10) {
        cout << "Copy Constructor(" << id << ")" << endl;
    }

    ~Object() {
        cout << "Destructor(" << id << ")" << endl;
    }

    friend ostream &operator<<(ostream &os, Object &object) {
        os << "Object(" << object.id << ")";
        return os;
    }

private:
    int id;
};

class A {
public:
    A() : a(global_id++) {}

    A(int a) : a(a) {}

    int getA() {
        return a;
    }

    friend ostream &operator<<(ostream &os, A &a) {
        cout << "A(" << a.a << ")";
        return os;
    }

private:
    int a;
};

class B {
public:
    B() : b(global_id++) {}

    B(int b) : b(b) {}

    int getB() {
        return b;
    }

    bool setB(int b) {
        this->b = b;
        return true;
    }

    friend ostream &operator<<(ostream &os, B &b) {
        cout << "B(" << b.b << ")";
        return os;
    }

private:
    int b;
};

// 智能指针
template<class T>
class SmartPointer {
public:
    SmartPointer(T *pointer) : pointer(pointer) {}

    SmartPointer(const SmartPointer<T> &other) : pointer(new T(*other.pointer)) {}

    ~SmartPointer() {
        if (pointer != nullptr) {
            delete pointer;
        }
    }

    T *operator->() {
        return pointer;
    }

    T &operator*() {
        return *pointer;
    }

    friend ostream &operator<<(ostream &os, SmartPointer<T> &smartPointer) {
        if (smartPointer.pointer != nullptr) {
            os << *smartPointer.pointer;
        } else {
            os << smartPointer.pointer;
        }
        return os;
    }

private:
    T *pointer;
};

template<class T>
SmartPointer<T> wrapper(T *op) {
    SmartPointer<T> p(op);
    return p;
}

int main() {
    SmartPointer<Object> p = new Object;
    cout << "p: " << p << endl;
    cout << endl;

    SmartPointer<Object> p1(p);
    cout << "p1: " << p1 << endl;
    cout << endl;

    SmartPointer<Object> p2 = wrapper(new Object);
    cout << "p2: " << p2 << endl;
    cout << endl;

    SmartPointer<A> pa(new A(100));
    cout << "pa: " << pa << endl;
    cout << "new A.getA(): " << pa->getA() << endl;
    cout << endl;

    SmartPointer<B> pb = new B(200);
    cout << "pb: " << pb << endl;
    cout << "new B.getB(): " << pb->getB() << endl;
    cout << endl;

    SmartPointer<B> pc = pb;
    cout << "pb: " << pb << endl;
    cout << "pc: " << pc << endl;
    pc->setB(pc->getB() + 100);
    cout << "pb: " << pb << endl;
    cout << "pc: " << pc << endl;
    cout << endl;

    return 0;
}
