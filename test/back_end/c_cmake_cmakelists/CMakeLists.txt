cmake_minimum_required(VERSION 3.17)
project(c_cmake_cmakelists C)

set(CMAKE_C_STANDARD 11)

add_executable(c_cmake_cmakelists main.c)

message(PROJECT_BINARY_DIR: ${PROJECT_BINARY_DIR})
message(PROJECT_SOURCE_DIR: ${PROJECT_SOURCE_DIR})
