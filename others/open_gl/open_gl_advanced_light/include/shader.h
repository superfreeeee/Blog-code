//
// Created by 超悠閒 on 2021/10/17.
//

#ifndef SHADER_H
#define SHADER_H

#include <glad/glad.h>

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

using namespace std;

class Shader {
public:
    GLuint ID;

    Shader(const GLchar *vertexPath, const GLchar *fragmentPath);

    void use();

// -------------------------------------------------------------------------------------
    void setBool(const string &name, GLboolean value) const;

    void setInt(const string &name, GLint value) const;

    void setFloat(const string &name, GLfloat value) const;

// -------------------------------------------------------------------------------------
    void setVec2(const string &name, glm::vec2 &value) const;

    void setVec2(const string &name, GLfloat x, GLfloat y) const;

// -------------------------------------------------------------------------------------
    void setVec3(const string &name, glm::vec3 &value) const;

    void setVec3(const string &name, GLfloat x, GLfloat y, GLfloat z) const;

// -------------------------------------------------------------------------------------
    void setVec4(const string &name, glm::vec4 &value) const;

    void setVec4(const string &name, GLfloat x, GLfloat y, GLfloat z, GLfloat w) const;

// -------------------------------------------------------------------------------------
    void setMat2(const string &name, glm::mat2 &mat) const;

    void setMat3(const string &name, glm::mat3 &mat) const;

    void setMat4(const string &name, glm::mat4 &mat) const;

private:
    void checkCompileErrors(GLuint shader, string type);
};

#endif //SHADER_H
