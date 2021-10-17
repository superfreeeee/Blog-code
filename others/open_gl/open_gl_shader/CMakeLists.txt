cmake_minimum_required(VERSION 3.17)
project(open_gl_template)

set(CMAKE_CXX_STANDARD 14)

set(GLEW_H /usr/local/Cellar/glew/2.2.0_1/include)
set(GLFW_H /usr/local/Cellar/glfw/3.3.4/include)
set(GLAD_H /usr/local/include)
set(KH_H /usr/local/include)
include_directories(${GLEW_H} ${GLFW_H} ${GLAD_H} ${KH_H})

# 添加目标链接
set(GLEW_LINK /usr/local/Cellar/glew/2.2.0_1/lib/libGLEW.2.2.0.dylib)
set(GLFW_LINK /usr/local/Cellar/glfw/3.3.4/lib/libglfw.3.dylib)
link_libraries(${OPENGL} ${GLEW_LINK} ${GLFW_LINK})

# 执行编译命令
# 这个glad.c在第2步中说过要拉到项目中，注意路径
include_directories(include)
add_executable(OpenGL
        src/glad.c
        src/main.cpp
        src/shader.cpp
        src/stb_image.cpp
        src/texture.cpp
        )

# mac下这步很重要
if (APPLE)
    target_link_libraries(OpenGL "-framework OpenGL")
    target_link_libraries(OpenGL "-framework GLUT")
endif ()