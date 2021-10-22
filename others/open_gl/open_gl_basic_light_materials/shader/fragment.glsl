#version 410 core
struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct Light {
    vec3 position;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;

uniform Material material;
uniform Light light;
uniform vec3 viewPos;
uniform vec3 lightPos;
uniform vec3 objectColor;
uniform vec3 lightColor;

void main() {
    // 1. 环境光照
    //    float ambientStrength = 0.1;
    //    vec3 ambient = ambientStrength * lightColor;
    //    vec3 ambient = lightColor * material.ambient;
    vec3 ambient = light.ambient * material.ambient;

    // 2. 漫反射光照
    vec3 norm = normalize(Normal);// 片段法向量
    vec3 lightDir = normalize(light.position - FragPos);// 片段 - 光源向量
    float diff = max(dot(norm, lightDir), 0.0);
    //    vec3 diffuse = diff * lightColor;
    //    vec3 diffuse = diff * (lightColor * material.diffues);
    vec3 diffuse = light.diffuse * (diff * material.diffuse);

    // 3. 镜面高光
    //    float specularStrength = 0.5;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    //    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    //    vec3 specular = specularStrength * spec * lightColor;
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    //    vec3 specular = lightColor * (spec * material.specular);
    vec3 specular = light.specular * (spec * material.specular);

    // 合成结果
    //    vec3 result = (ambient + diffuse + specular) * objectColor;
    //    FragColor = vec4(lightColor * objectColor, 1.0);
    vec3 result = ambient + diffuse + specular;
    FragColor = vec4(result, 1.0);
}