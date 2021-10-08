//
// Created by 超悠閒 on 2021/10/8.
//

#ifndef C_BIG_INT_CLINT_H
#define C_BIG_INT_CLINT_H

#include "types.h"

// 大数单位
#define CLINT_MAX_DIGIT      64
#define DIGIT_BASE      0x10000  // = 2^16 = 16 ^ 4

// 大数单位
typedef USHORT clint;
typedef clint CLINT[CLINT_MAX_DIGIT + 1]; // l n1 n2 ... nl

// 大数运算状态码
#define E_CLINT_OK  0x0001; // 成功
#define E_CLINT_OFL 0x0002; // 上溢
#define E_CLINT_UFL 0x0004; // 下溢

// 大数运算
int add_l(CLINT a_l, CLINT b_l, CLINT c_l); // 加法
int sub_l(CLINT a_l, CLINT b_l, CLINT c_l); // 减法
int uadd_l(CLINT a_l, USHORT b, CLINT c_l); // 与小数加法
int usub_l(CLINT a_l, USHORT b, CLINT c_l); // 与小数减法
int inc_l(CLINT a_l); // +1
int dec_l(CLINT a_l); // -1
int mul_l(CLINT a_l, CLINT b_l, CLINT c_l); // 加法
int umul_l(CLINT a_l, USHORT b, CLINT c_l); // 加法
int sqr_l(CLINT a_l, CLINT s_l); // 平方

#endif //C_BIG_INT_CLINT_H
