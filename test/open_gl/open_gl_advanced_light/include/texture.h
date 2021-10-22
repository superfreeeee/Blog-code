//
// Created by 超悠閒 on 2021/10/17.
//

#ifndef TEXTURE_H
#define TEXTURE_H

#include <glad/glad.h>
#include "shader.h"

void loadTexture(const char *filename, GLuint *texture, int hasAlpha);

#endif //TEXTURE_H
