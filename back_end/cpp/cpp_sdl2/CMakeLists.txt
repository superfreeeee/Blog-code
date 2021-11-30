cmake_minimum_required(VERSION 3.20)
project(cpp_sdl2)

set(CMAKE_CXX_STANDARD 11)

set(SDL_H /opt/homebrew/Cellar/sdl2/2.0.16/include) # 这个SDL开发包的路径，可以通过brew info sdl2查出来
include_directories(${SDL_H}) # 添加SDL头文件搜索路径

set(SDL_LIB /opt/homebrew/Cellar/sdl2/2.0.16/lib/libSDL2-2.0.0.dylib)
link_libraries(${SDL_LIB}) # 增加SDL链接库目录

add_executable(
        cpp_sdl2

        main.cpp

        App.cpp
        App.h
)
