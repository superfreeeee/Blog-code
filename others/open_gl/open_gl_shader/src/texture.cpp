//
// Created by 超悠閒 on 2021/10/17.
//

#include "texture.h"
#include "stb_image.h"
#include <glad/glad.h>

void loadTexture(const char *filename, GLuint *texture, int hasAlpha) {
    int width, height, nrChannels;
    stbi_set_flip_vertically_on_load(true);
    unsigned char *data;

    glGenTextures(1, texture);
    glBindTexture(GL_TEXTURE_2D, *texture);

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

    data = stbi_load(filename, &width, &height, &nrChannels, 0);
    if (data) {
        GLenum colorFormat = hasAlpha ? GL_RGBA : GL_RGB;
        glTexImage2D(GL_TEXTURE_2D, 0, colorFormat, width, height, 0, colorFormat, GL_UNSIGNED_BYTE, data);
        glGenerateMipmap(GL_TEXTURE_2D);
    } else {
        cout << "Failed to load texture: " << filename << endl;
    }
    stbi_image_free(data);

    glBindTexture(GL_TEXTURE_2D, 0); // unbind texture
}
