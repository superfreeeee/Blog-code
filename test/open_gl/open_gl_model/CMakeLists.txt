cmake_minimum_required(VERSION 3.17)
project(open_gl_advanced_light)

set(CMAKE_CXX_STANDARD 14)

set(GLEW_H /usr/local/Cellar/glew/2.2.0_1/include)
set(GLFW_H /usr/local/Cellar/glfw/3.3.4/include)
set(ASSIMP_H /usr/local/Cellar/assimp/5.0.1/include)
set(LOCAL_H /usr/local/include)
include_directories(${GLEW_H} ${GLFW_H} ${LOCAL_H} ${ASSIMP_H})

# 添加目标链接
set(GLEW_LINK /usr/local/Cellar/glew/2.2.0_1/lib/libGLEW.2.2.0.dylib)
set(GLFW_LINK /usr/local/Cellar/glfw/3.3.4/lib/libglfw.3.dylib)
set(ASSIMP_LINK /usr/local/Cellar/assimp/5.0.1/lib/libassimp.5.0.0.dylib)
link_libraries(${OPENGL} ${GLEW_LINK} ${GLFW_LINK} ${ASSIMP_LINK})

# 执行编译命令
# 这个glad.c在第2步中说过要拉到项目中，注意路径
include_directories(include)
add_executable(OpenGL
        # 三方库
        ext/glad.c
        ext/stb_image.cpp
        # 工具类
        tools/shader.cpp    # 着色器
        tools/texture.cpp   # 纹理
        tools/camera.cpp    # 相机
        tools/model.cpp     # 模型加载
        tools/mesh.cpp      # 网格
        # 主入口
        src/main.cpp
        )

# mac下这步很重要
if (APPLE)
    target_link_libraries(OpenGL "-framework OpenGL")
    target_link_libraries(OpenGL "-framework GLUT")
endif ()