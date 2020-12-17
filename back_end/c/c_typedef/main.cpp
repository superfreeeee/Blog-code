#include <iostream>
#include <string>

using namespace std;

typedef int I;
typedef int *Ip;
typedef int **Ipp;
typedef int Ia[10];
typedef int (*Iap)[10];

typedef struct {
    int id;
    string name;
} Person;

ostream &operator<<(ostream &os, Person &person) {
    os << "Identity: {id=" << person.id << ", name=" << person.name << "}";
    return os;
}

typedef int binary_func(int, int);

typedef struct {
    inline binary_func(add);
    inline binary_func(sub);
    binary_func mul;
} Calculator;

int Calculator::add(int x, int y) { return x + y; }

int Calculator::sub(int x, int y) { return x + y; }

void f() {
    cout << "function f" << endl;
}

void g() {
    cout << "function g" << endl;
}


int main() {
    I i(2);
    cout << "i=" << i << ", &i=" << &i << endl;
    I(j) = 4;
    cout << "j=" << j << ", &j=" << &j << endl;
    I k = 4;
    cout << "k=" << k << ", &k=" << &k << endl;

    Ip ip(&i);
    cout << "ip=" << ip << ", *ip=" << *ip << endl;

    Ipp ipp(&ip);
    cout << "ipp=" << ipp << ", *ipp=" << *ipp << ", **ipp=" << **ipp << endl;

    Ia ia = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    Iap iap(&ia);
    cout << "ia=" << ia << endl;
    cout << "iap=" << iap << ", *iap=" << *iap << endl;
    cout << iap[0] << endl;
    cout << iap[1] << endl;
    cout << iap[9] << endl;
    cout << iap[10] << endl;
    cout << (*iap)[0] << endl;
    cout << (*iap)[1] << endl;

    Person p1({1, "John"});
    cout << p1 << endl;

    Calculator calculator;
    cout << "1 + 2 = " << calculator.add(1, 2) << endl;
    cout << "1 - 2 = " << calculator.sub(1, 2) << endl;

//    void (*fp)();
//    fp = f;
//    fp();
//    fp = g;
//    fp();

//    typedef void (*FP)();
//    FP fp_f = f, fp_g = g;
//    fp_f();
//    fp_g();

    typedef double (*DFPV)(); // return Double, Function Pointer, Void parameter
    typedef DFPV (*DFPV_ten)[10]; // 指向一个大小为 10 数组，元素为上述类型的指针
    typedef DFPV_ten (*FP)();

    double (*(*(*_fp)())[10])();
    FP fp = _fp;

//    typedef void (*FP)();
//    typedef FP FP_array[10];
//    typedef

    return 0;
}
