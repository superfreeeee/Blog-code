//
// Created by 超悠閒 on 2021/10/18.
//

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

#include <iostream>

using namespace std;

void show(glm::vec4 &vec);

int main2() {

    glm::vec4 vec = glm::vec4(1.0f);
    glm::mat4 trans = glm::mat4(1.0f);

    trans = glm::translate(trans, glm::vec3(1.0f, 0.0f, -1.0f));

    show(vec);
    vec = trans * vec;
    show(vec);

    return 0;

}

void show(glm::vec4 &vec) {
    cout << "x: " << vec.x << ", y: " << vec.y << ", z: " << vec.z << ", w: " << vec.w << endl;
}
