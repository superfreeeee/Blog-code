cmake_minimum_required(VERSION 3.17)
project(cpp)

set(CMAKE_CXX_STANDARD 11)

include_directories(include include/sorting include/adt include/test)
aux_source_directory(source SOURCE)
aux_source_directory(source/sorting SORTING_SOURCE)
aux_source_directory(source/adt ADT_SOURCE)
aux_source_directory(source/test TEST_SOURCE)
add_executable(cpp source/main.cpp ${SOURCE} ${SORTING_SOURCE} ${ADT_SOURCE} ${TEST_SOURCE} include/test/myassert.h include/test/sorting_test.h include/test/stack_test.h source/test/stack_test.cpp include/adt/queue.h include/test/queue_test.h source/test/queue_test.cpp)

