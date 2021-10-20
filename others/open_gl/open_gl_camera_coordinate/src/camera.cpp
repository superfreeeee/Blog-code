//
// Created by 超悠閒 on 2021/10/20.
//

#include "camera.h"

Camera::Camera(glm::vec3 position, glm::vec3 up, float yaw, float pitch) : front(glm::vec3(0.0f, 0.0f, -1.0f)),
                                                                           moveSpeed(DEFAULT_SPEED),
                                                                           mouseSensitivity(DEFAULT_SENSITIVITY),
                                                                           zoom(DEFAULT_ZOOM) {
    this->position = position;
    this->worldUp = up;
    this->yaw = yaw;
    this->pitch = pitch;
    this->updateCameraVectors();
}

Camera::Camera(float posX, float posY, float posZ, float upX, float upY, float upZ, float yaw, float pitch) :
        front(glm::vec3(0.0f, 0.0f, -1.0f)),
        moveSpeed(DEFAULT_SPEED),
        mouseSensitivity(DEFAULT_SENSITIVITY),
        zoom(DEFAULT_ZOOM) {
    this->position = glm::vec3(posX, posY, posZ);
    this->worldUp = glm::vec3(upX, upY, upZ);
    this->yaw = yaw;
    this->pitch = pitch;
    this->updateCameraVectors();
}

glm::mat4 Camera::GetViewMatrix() {
    return glm::lookAt(this->position, this->position + this->front, this->up);
}

void Camera::ProcessKeyboard(Camera_Movement direction, float deltaTime) {
    float velocity = this->moveSpeed * deltaTime;
    if (direction == FORWARD) {
        this->position += this->front * velocity;
    } else if (direction == BACKWARD) {
        this->position -= this->front * velocity;
    } else if (direction == LEFT) {
        this->position -= this->right * velocity;
    } else if (direction == RIGHT) {
        this->position += this->right * velocity;
    }
//    this->position.y = 0.0f;
}

void Camera::ProcessMouseMovement(float xoffset, float yoffset, GLboolean constrainPitch) {
    xoffset *= this->mouseSensitivity;
    yoffset *= this->mouseSensitivity;

    this->yaw += xoffset;
    this->pitch += yoffset;

    // make sure that when pitch is out of bounds, screen doesn't get flipped
    if (constrainPitch) {
        if (this->pitch > 89.0f) {
            this->pitch = 89.0f;
        } else if (this->pitch < -89.0f) {
            this->pitch = -89.0f;
        }
    }

    // update Front, Right and Up Vectors using the updated Euler angles
    this->updateCameraVectors();
}

void Camera::ProcessMouseScroll(float yoffset) {
    float zoom = this->zoom -= (float) yoffset;
    if (zoom < 1.0f) {
        this->zoom = 1.0f;
    } else if (zoom > 45.0f) {
        this->zoom = 45.0f;
    }
}

void Camera::updateCameraVectors() {
    // calculate the new Front vector
    glm::vec3 front;
    front.x = cos(glm::radians(this->yaw)) * cos(glm::radians(this->pitch));
    front.y = sin(glm::radians(this->pitch));
    front.z = sin(glm::radians(this->yaw)) * cos(glm::radians(this->pitch));
    this->front = glm::normalize(front);
    // also re-calculate the Right and Up vector

    // normalize the vectors, because their length gets closer to 0 the more you look up or down which results in slower movement.
    this->right = glm::normalize(glm::cross(this->front, this->worldUp));
    this->up = glm::normalize(glm::cross(this->right, this->front));
}