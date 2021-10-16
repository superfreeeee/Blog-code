cmake_minimum_required(VERSION 3.17)
project(open_gl_install)

set(CMAKE_CXX_STANDARD 14)

set(LOCAL_H /usr/local/include)
include_directories(${LOCAL_H})

set(GLFW_LINK /usr/local/Cellar/glfw/3.3.4/lib/libglfw.3.dylib)
link_libraries(${OPENGL} ${GLFW_LINK})

add_executable(OpenGL src/glad.c src/main.cpp)

if (APPLE)
    target_link_libraries(OpenGL "-framework OpenGL")
    target_link_libraries(OpenGL "-framework GLUT")
endif ()
