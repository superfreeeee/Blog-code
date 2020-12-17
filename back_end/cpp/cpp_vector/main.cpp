#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Integer {
public:
    Integer(int val = -1);
    friend ostream& operator<<(ostream& out, Integer i);
private:
    int _val;
};

Integer::Integer(int val): _val(val) {}

ostream& operator<<(ostream& out, Integer i) {
    out << "Integer(" << i._val << ")";
    return out;
}

// 打印向量
template <class T>
void print_vector(const vector<T>& v) {
    cout << "[";
    for(int i=0 ; i<v.size() ; i++) {
        cout << v[i] << (i < v.size() - 1 ? ", " : "");
    }
    cout << "]" << endl;
}

int main() {
//    定義
//    vector<int> v1;
//    print_vector(v1); // []
//    vector<int>* v2 = new vector<int>;
//    print_vector(*v2); // []
//    vector<int> v3;
//    print_vector(v3); // []
//    vector<int> v4(10);
//    print_vector(v4); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//    vector<int> v5(5, 2);
//    print_vector(v5); // [2, 2, 2, 2, 2]

//    Access
//    vector<int> v1(10);
//    for(int i=0 ; i<10 ; i++) {
//        v1[i] = i;
//    }
//    print_vector(v1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//
//    cout << v1[2] << endl; // 2
//    cout << v1.at(4) << endl; // 4
//    cout << v1.front() << endl; // 0
//    cout << v1.back() << endl; // 9

//    Insert & erase
//    vector<int> v1;
//    print_vector(v1); // []
//    for(int i=0 ; i<4 ; i++) {
//        v1.push_back(i);
//    }
//    print_vector(v1); // [0, 1, 2, 3]
//    v1.pop_back();
//    print_vector(v1); // [0, 1, 2]
//    for(int i=0 ; i<3 ; i++) {
//        v1.insert(v1.begin()+i, i+10);
//    }
//    print_vector(v1); // [10, 11, 12, 0, 1, 2]
//    v1.insert(v1.begin(), 3, 5);
//    print_vector(v1); // [5, 5, 5, 10, 11, 12, 0, 1, 2]
//    v1.erase(v1.begin()+2);
//    print_vector(v1); // [5, 5, 10, 11, 12, 0, 1, 2]
//    v1.erase(v1.begin()+2, v1.begin()+5);
//    print_vector(v1); // [5, 5, 0, 1, 2]
//
//    v1.clear();
//    print_vector(v1); // []
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 0, capacity: 16

//    capacity
//    vector<int> v1(5, 3);
//    print_vector(v1); // [3, 3, 3, 3, 3]
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 5, capacity: 5
//    cout << "isEmpty: " << v1.empty() << endl; // 0
//
//    v1.push_back(-1);
//    print_vector(v1); // [3, 3, 3, 3, 3, -1]
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 6, capacity: 10
////    可以看到 size 指具體元素個數，而 capacity 則是當前數組容量，容量不足時通常擴展為兩倍大小
//
//    v1.resize(2);
//    print_vector(v1); // [3, 3]
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 2, capacity: 10
//    cout << v1[5] << endl; // -1
////    resize 若小於當前 size 時，僅僅只會縮小 size，而 capacity 不變，並且也不會改變原來位置的值
//
//    v1.resize(4);
//    print_vector(v1); // [3, 3, 0, 0]
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 4, capacity: 10
//    cout << v1[5] << endl; // -1
////    resize 大於當前 size 時，則會將多出來的空間初始化，其他位置一樣不變
//
//    v1.assign(10, -2);
//    print_vector(v1); // [-2, -2, -2, -2, -2, -2, -2, -2, -2, -2]
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 10, capacity: 10
////    與 resize 類似，第二個參數指定初始化值
//
//    v1.reserve(15);
//    print_vector(v1); // [-2, -2, -2, -2, -2, -2, -2, -2, -2, -2]
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 10, capacity: 15
//    v1.reserve(5);
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 10, capacity: 15
//    cout << v1[14] << endl; // 0
////    reserve 與 resize 不同，僅僅只是確保 capacity 的大小，比當前 capacity 大時會預先擴展

//    vector<int> v0(100);
//    v0.push_back(0);
//    cout << "size: " << v0.size() << ", capacity: " << v0.capacity() << endl; // size: 101, capacity: 200
//
//    vector<int> v1(100);
//    v1.reserve(101);
//    v1.push_back(0);
//    cout << "size: " << v1.size() << ", capacity: " << v1.capacity() << endl; // size: 101, capacity: 101

//    vector<int> v1;
//    for(int i=0 ; i<10 ; i++) {
//        // 應用在 insert 中的 position
//        v1.insert(v1.begin(), i);
//    }
//    print_vector(v1);
//    // 應用在 algorithm 的 sort 函數
//    sort(v1.begin(), v1.end());
//    print_vector(v1);

    return 0;
}

//. . . . . . 2 3 4
//. 1 . . . . . . .
//. . . . . . 5 6 .
//. . . . . . . . .
//. . . . . . . . .
//. . . . . . . . .
//. 8 . . . . . . .
//. . . 7 9 . . . .
//. . . . . . . 8 .

//. . . . . . 2 3 4
//. 1 . . . . . . .
//. . . . . . 5 6 1
//. . . . . . . . .
//. . . . . . . . .
//. . . . . . . . .
//. 8 . . . . . . .
//. . . 7 9 8 . . .
//. . . . . . . 8 .

//. . . . . . 2 3 4
//. 1 . . . . . . 8
//. . . . . . 5 6 1
//. . . . . . . . .
//. . . . . . . . .
//. . . . . . . . .
//. 8 . . . . . . .
//. . . 7 9 8 . . .
//. . . . . . . 8 .