//
// Created by 超悠閒 on 2021/10/17.
//

#ifndef TEXTURE_H
#define TEXTURE_H

#include <glad/glad.h>
#include "shader.h"

GLuint loadTexture(const char *filename);

GLuint loadTextureFromFile(const char *path, const string &directory, bool gamma = false);

#endif //TEXTURE_H
