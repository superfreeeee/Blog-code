#include <iostream>
#include <string>

using namespace std;

int main() {
//    構造方法
//    // 棧上變量
//    string s1;
//    // 傳入字符串直接量
//    string s2("string 2");
//    // 傳入另一個 string
//    string s3(s2);
//    // 使用直接量初始化
//    string s4 = "string 4";
//    cout << "s1: " << s1 << endl; // s1:
//    cout << "s2: " << s2 << endl; // s2: string 2
//    cout << "s3: " << s3 << endl; // s3: string 2
//    cout << "s4: " << s4 << endl; // s3: string 4

//    取得單個字符或子串
//    string s = "abcdefg";
//    cout << s << endl; // abcdefg
//    // 使用偏移量，UTF-8 編碼時需注意
//    cout << s[1] << endl; // b
//    // 使用 at 方法
//    cout << s.at(2) << endl; // c
//    // 擷取子串
//    cout << s.substr(3, 3) << endl; // def
//    // 查找子串，不存在時返回 -1
//    cout << s.find("e") << endl; // 4
//    cout << (int)s.find("e", 5)<< endl; // -1

//    修改字符串
//    string s;
//
//    // 直接量賦值
//    s = "___";
//    cout << s << endl; // ___
//
//    // 連接字符串
//    s += "__";
//    cout << s << endl; // _____
//
//    // 插入字符串
//    s.insert(1, "2");
//    cout << s << endl; // _2____
//
//    // 插入重複字符，第二個參數為次數
//    s.insert(3,3, '4');
//    cout << s << endl; // _2_444___
//
//    // 重新賦值，與 s = string("abcde").substr(2, 4) 等價
//    s.assign("abcde", 2, 4);
//    cout << s << endl; // cde
//
//    // 於結尾連接字符串，與 s += string("abcde").substr(2, 4) 等價
//    s.append("abcde", 2, 4);
//    cout << s << endl; // cdecde
//
//    // 刪除子串
//    s.erase(1, 4);
//    cout << s << endl; // ce

//    其他屬性
    string s1 = "12345";
    string s2 = "67890";
    string s3 = "12345";
    // 字符串長度
    cout << s1.size() << endl; // 5
    cout << s1.length() << endl; // 5
    // 判斷字符串是否為空
    cout << s1.empty() << endl; // 0
    // 比較字符串內容
    cout << (s1 == s2) << endl; // 0
    cout << (s1 == s3) << endl; // 1

    cout << (s1 < s2) << endl; // 1
    cout << s1.compare(s2) << endl; // -5

    return 0;
}
