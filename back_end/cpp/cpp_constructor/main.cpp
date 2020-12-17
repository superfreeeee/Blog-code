#include <iostream>

using namespace std;

//class Demo {
//public:
//    Demo() {
//        cout << "無參數構造函數(" << _id << ")" << endl;
//    }
//    Demo(int id): _id(id) {
//        cout << "有參數構造函數帶初始化列表(" << _id << ")" << endl;
//    }
//    Demo(const Demo &other) {
//        cout << "拷貝構造函數" << endl;
//        this->_id = other._id;
//    }
//    void operator=(const Demo &other) {
//        cout << "賦值運算符重載" << endl;
//        this->_id = other._id;
//    }
//    ~Demo() {
//        cout << "析構函數(" << _id << ")" << endl;
//    }
//    friend ostream& operator<<(ostream &out, const Demo &demo) {
//        out << "打印運算符重載：Demo(" << demo._id << ")" << endl;
//        return out;
//    }
//
//private:
//    int _id;
//};
//
//Demo given() {
//    Demo demo(-2);
//    return demo;
//}
//
//Demo& given2() {
//    Demo demo(-3);
//    return demo;
//}

void prefix(int id) {
    cout << endl << "===== demo " << id << " =====" << endl;
}

//class Wrapper {
//public:
//    Wrapper(){
//        demo = new Demo;
//    }
//    ~Wrapper() {
//        delete demo;
//    }
//private:
//    Demo* demo;
//};

class Demo {
public:
    Demo();
    Demo(int);
    Demo(const Demo&);
    void operator=(const Demo&);
    ~Demo();
    friend ostream& operator<<(ostream&, const Demo&);

private:
    int _id;
};

Demo::Demo() {
    cout << "no-param constructor(" << _id << ")" << endl;
}

Demo::Demo(int id): _id(id) {
    cout << "param constructor(" << _id << ")" << endl;
}

Demo::Demo(const Demo& other) {
    this->_id = other._id;
    cout << "copy-constructor(" << _id << ")" << endl;
}

void Demo::operator=(const Demo& other) {
    this->_id = other._id;
    cout << "Operator overload =: Demo(" << _id << ")" << endl;
}

Demo::~Demo() {
    cout << "destructor(" << _id << ")" << endl;
}

ostream& operator<<(ostream& out, const Demo& other) {
    out << "Operator overload <<: Demo(" << other._id << ")" << endl;
    return out;
}

int test_demo();
int test_demo2();

int main() {
    test_demo2();
}

int test_demo2() {
//    prefix(1);
//    Demo demo;
////    Demo demo();
//    Demo* demo5 = new Demo();
//    Demo* demo6 = new Demo;

//    cout << demo;
//
//    prefix(2);
//    Demo demo2(1);
//    Demo* demo3 = new Demo(2);
//    delete demo3;
//
//    prefix(3);
//    Demo demo(1);
//    Demo demo2(2);
//
//// 調用拷貝構造函數
//    Demo demo3(demo);
//// 初始化表達式，與上面等價
//    Demo demo4 = demo2;
//    int i(100);
//    cout << i << endl;
//
//    prefix(4);
//    Demo demo(1);
//    Demo demo2(2);
//    demo2 = demo;

//// 棧上對象
//    Demo demo(1);
//// 堆上對象需要主動調用 delete 釋放內存
//    Demo* demo2 = new Demo(2);
//    delete demo2;
    Demo demo(0);
    cout << demo;

    cout << endl << "===== all constructor over =====" << endl;
    return 0;
}

//int test_demo() {
////    cout << "Hello, World!" << endl;
//    prefix(1);
//    Demo demo;
//    cout << demo;
//
//    prefix(2);
//    Demo demo2();
//    cout << demo2;
//
//    prefix(3);
//    Demo demo3(3);
//    cout << demo3;
//
//    prefix(4);
//    demo = demo3;
//    cout << demo;
//
//    prefix(5);
//    demo = given();
//    cout << demo;
//
//    prefix(6);
//    Demo demo4(demo);
//    cout << demo4;
//
//    prefix(7);
//    Demo demo5(given2());
//    cout << demo5;
//
//    prefix(8);
//    cout << given2();
//
//    prefix(9);
//    Demo* demo6 = new Demo();
//
//    prefix(10);
//    Wrapper wrapper;
//
//    cout << endl << "===== all constructor over =====" << endl << endl;
//    return 0;
//}
