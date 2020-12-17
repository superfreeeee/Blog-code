#include <iostream>
#include <map>
#include <string>

using namespace std;

typedef map<int, string> MapIS;
typedef pair<int, string> PairIS;
typedef MapIS::value_type MapIS_VT;
typedef MapIS::iterator MapIS_IT;
typedef MapIS::reverse_iterator MapIS_RIT;
typedef MapIS::const_iterator MapIS_CIT;

ostream& operator<<(ostream& out, MapIS mis) {
    out << "map {";
    for(MapIS_IT iter = mis.begin(), last = --mis.end() ; iter != mis.end() ; iter++) {
        cout << " " << iter->first << "=" << iter->second << (iter == last ? " " : ",");
    }
    out << "}" << endl;
    return out;
}

int main() {
//    MapIS m1;
//    m1.insert(PairIS(1, "a"));
//    m1.insert(PairIS(2, "b"));
//    m1.insert(MapIS_VT(3, "c"));
//    m1.insert(MapIS_VT(4, "d"));
//    m1[5] = "e";
//    m1[6] = "f";
//    cout << m1;

//    MapIS m1;
//    m1.insert(PairIS(1, "a"));
//    m1.insert(PairIS(3, "c"));
//    m1.insert(PairIS(5, "e"));
//
//    MapIS_IT iter;
//    iter = m1.find(3);
//    cout << (iter == m1.end()) << endl;
//    cout << "pair( " << iter->first << "=" << iter->second << " )" << endl;
//
//    iter = m1.find(7);
//    cout << (iter == m1.end()) << endl;
//    cout << "pair( " << iter->first << "=" << iter->second << " )" << endl;
//
//    iter = m1.lower_bound(3);
//    cout << "pair( " << iter->first << "=" << iter->second << " )" << endl;
//
//    iter = m1.upper_bound(3);
//    cout << "pair( " << iter->first << "=" << iter->second << " )" << endl;

//    MapIS mis;
//    mis.insert(PairIS(1, "a"));
//    mis.insert(PairIS(2, "b"));
//    mis.insert(PairIS(3, "c"));
//    mis.insert(PairIS(4, "d"));
//    mis.insert(PairIS(5, "e"));
//    cout << mis; // map { 1=a, 2=b, 3=c, 4=d, 5=e }
//
//    MapIS_IT iter;
//    MapIS_IT res;
//
//    // 查找(find)然後刪除(erase)元素，如果刪除 map.end() 會拋出異常
//    iter = mis.find(3);
//    res = mis.erase(iter);
//    cout << res->first << "=" << res->second << endl; // 4=d
//    cout << (res == mis.find(4)) << endl; // 1
//    // 刪除後返回下一個元素的 iterator
//
//    cout << mis; // map { 1=a, 2=b, 4=d, 5=e }
//
//    // 清空映射表
//    mis.clear();
//    cout << mis; // map {}

//    MapIS mis;
//    mis.insert(PairIS(1, "a"));
//    mis.insert(PairIS(2, "b"));
//    mis.insert(PairIS(3, "c"));
//    mis.insert(PairIS(4, "d"));
//    mis.insert(PairIS(5, "e"));
//    cout << mis; // map { 1=a, 2=b, 3=c, 4=d, 5=e }
//
//    for(MapIS_IT it = mis.begin() ; it != mis.end() ; it++) {
//        cout << it->first << "=" << it->second << endl;
//    }
////    1=a
////    2=b
////    3=c
////    4=d
////    5=e
//    for(MapIS_RIT rit = mis.rbegin() ; rit != mis.rend() ; rit++) {
//        cout << rit->first << "=" << rit->second << endl;
//    }
////    5=e
////    4=d
////    3=c
////    2=b
////    1=a
//    for(MapIS_CIT cit = mis.cbegin() ; cit != mis.cend() ; cit++) {
//        cout << cit->first << "=" << cit->second << endl;
//    }
////    1=a
////    2=b
////    3=c
////    4=d
////    5=e
    return 0;
}
