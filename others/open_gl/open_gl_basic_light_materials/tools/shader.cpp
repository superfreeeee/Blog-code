//
// Created by 超悠閒 on 2021/10/17.
//

#include "shader.h"

using namespace std;

Shader::Shader(const GLchar *vertexPath, const GLchar *fragmentPath) {
    string vertexCode, fragmentCode;
    ifstream vShaderFile, fShaderFile;

    vShaderFile.exceptions(ifstream::failbit | ifstream::badbit);
    fShaderFile.exceptions(ifstream::failbit | ifstream::badbit);

//    读取着色器源文件
    try {
        vShaderFile.open(vertexPath);
        fShaderFile.open(fragmentPath);

        stringstream vShaderStream, fShaderStream;

        vShaderStream << vShaderFile.rdbuf();
        fShaderStream << fShaderFile.rdbuf();

        vertexCode = vShaderStream.str();
        fragmentCode = fShaderStream.str();
    } catch (ifstream::failure &e) {
        cout << "ERROR::SHADER::FILE_NOT_SUCCESSFULLY_READ" << endl;
    }

    const char *vShaderCode = vertexCode.c_str();
    const char *fShaderCode = fragmentCode.c_str();

//    创建着色器
    unsigned int vertexShader;
    vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vShaderCode, NULL);
    glCompileShader(vertexShader);
    checkCompileErrors(vertexShader, "VERTEX");

    unsigned int fragmentShader;
    fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fShaderCode, NULL);
    glCompileShader(fragmentShader);
    checkCompileErrors(fragmentShader, "FRAGMENT");

//    创建着色器程序
    ID = glCreateProgram();
    glAttachShader(ID, vertexShader);
    glAttachShader(ID, fragmentShader);
    glLinkProgram(ID);
    checkCompileErrors(ID, "PROGRAM");
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);
}

void Shader::use() {
    glUseProgram(ID);
}

// -------------------------------------------------------------------------------------
void Shader::setBool(const string &name, GLboolean value) const {
    glUniform1i(glGetUniformLocation(ID, name.c_str()), (int) value);
}

void Shader::setInt(const string &name, GLint value) const {
    glUniform1i(glGetUniformLocation(ID, name.c_str()), value);
}

void Shader::setFloat(const string &name, GLfloat value) const {
    glUniform1f(glGetUniformLocation(ID, name.c_str()), value);
}

// -------------------------------------------------------------------------------------
void Shader::setVec2(const string &name, glm::vec2 &value) const {
    glUniform2fv(glGetUniformLocation(ID, name.c_str()), 1, &value[0]);
}

void Shader::setVec2(const string &name, GLfloat x, GLfloat y) const {
    glUniform2f(glGetUniformLocation(ID, name.c_str()), x, y);
}

// -------------------------------------------------------------------------------------
void Shader::setVec3(const string &name, glm::vec3 &value) const {
    glUniform3fv(glGetUniformLocation(ID, name.c_str()), 1, &value[0]);
}

void Shader::setVec3(const string &name, GLfloat x, GLfloat y, GLfloat z) const {
    glUniform3f(glGetUniformLocation(ID, name.c_str()), x, y, z);
}

// -------------------------------------------------------------------------------------
void Shader::setVec4(const string &name, glm::vec4 &value) const {
    glUniform4fv(glGetUniformLocation(ID, name.c_str()), 1, &value[0]);
}

void Shader::setVec4(const string &name, GLfloat x, GLfloat y, GLfloat z, GLfloat w) const {
    glUniform4f(glGetUniformLocation(ID, name.c_str()), x, y, z, w);
}

// -------------------------------------------------------------------------------------
void Shader::setMat2(const string &name, glm::mat2 &mat) const {
    glUniformMatrix2fv(glGetUniformLocation(ID, name.c_str()), 1, GL_FALSE, &mat[0][0]);
}

void Shader::setMat3(const string &name, glm::mat3 &mat) const {
    glUniformMatrix3fv(glGetUniformLocation(ID, name.c_str()), 1, GL_FALSE, &mat[0][0]);
}

void Shader::setMat4(const string &name, glm::mat4 &mat) const {
    glUniformMatrix4fv(glGetUniformLocation(ID, name.c_str()), 1, GL_FALSE, &mat[0][0]);
}


void Shader::checkCompileErrors(GLuint shader, string type) {
    GLint success;
    GLchar infoLog[1024];
    if (type != "PROGRAM") {
        glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
        if (!success) {
            glGetShaderInfoLog(shader, 1024, NULL, infoLog);
            cout << "ERROR::SHADER_COMPILATION_ERROR of type: " << type << endl << infoLog << endl
                 << " -- --------------------------------------------------- -- " << endl;
        }
    } else {
        glGetProgramiv(shader, GL_LINK_STATUS, &success);
        if (!success) {
            glGetProgramInfoLog(shader, 1024, NULL, infoLog);
            cout << "ERROR::PROGRAM_LINKING_ERROR of type: " << type << endl << infoLog << endl
                 << " -- --------------------------------------------------- -- " << endl;
        }
    }
}
