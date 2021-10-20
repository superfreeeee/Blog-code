//
// Created by 超悠閒 on 2021/10/17.
//

#ifndef OPEN_GL_TEMPLATE_SHADER_H
#define OPEN_GL_TEMPLATE_SHADER_H

#include <glad/glad.h>

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

using namespace std;

class Shader {
public:
    unsigned int ID;

    Shader(const GLchar *vertexPath, const GLchar *fragmentPath);

    void use();

    void setBool(const string &name, bool value) const;

    void setInt(const string &name, int value) const;

    void setFloat(const string &name, float value) const;

private:
    void checkCompileErrors(unsigned int shader, string type);
};

#endif //OPEN_GL_TEMPLATE_SHADER_H
