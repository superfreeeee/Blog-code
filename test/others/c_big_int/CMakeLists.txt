cmake_minimum_required(VERSION 3.17)
project(c_big_int C)

set(CMAKE_C_STANDARD 11)

add_executable(c_big_int main.c clint.c)