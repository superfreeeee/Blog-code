//
// Created by 超悠閒 on 2021/10/20.
//

#ifndef OPEN_GL_CAMERA_COORDINATE_CAMERA_H
#define OPEN_GL_CAMERA_COORDINATE_CAMERA_H

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

enum Camera_Movement {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT
};

// Default camera values
const float DEFAULT_YAW = -90.0f;
const float DEFAULT_PITCH = 0.0f;
const float DEFAULT_SPEED = 5.0f;
const float DEFAULT_SENSITIVITY = 0.1f;
const float DEFAULT_ZOOM = 45.0f;

class Camera {
public:
    glm::vec3 position; // 相机位置
    glm::vec3 front;    // 相机前景中心
    glm::vec3 up;       // 相机上向量
    glm::vec3 right;    // 相机右向量
    glm::vec3 worldUp;  // 世界空间上向量

    float yaw;   // 水平旋转角
    float pitch; // 镜头仰角
    float moveSpeed;        // 移动速度
    float mouseSensitivity; // 鼠标灵敏度
    float zoom;  // 镜头缩放

    Camera(glm::vec3 position = glm::vec3(0.0f, 0.0f, 0.0f),
           glm::vec3 up = glm::vec3(0.0f, 1.0f, 0.0f),
           float yaw = DEFAULT_YAW,
           float pitch = DEFAULT_PITCH);

    Camera(float posX, float posY, float posZ, float upX, float upY, float upZ, float yaw, float pitch);

    glm::mat4 GetViewMatrix();

    void ProcessKeyboard(Camera_Movement direction, float deltaTime);

    void ProcessMouseMovement(float xoffset, float yoffset, GLboolean constrainPitch = true);

    void ProcessMouseScroll(float yoffset);

private:
    void updateCameraVectors();

};

#endif //OPEN_GL_CAMERA_COORDINATE_CAMERA_H
