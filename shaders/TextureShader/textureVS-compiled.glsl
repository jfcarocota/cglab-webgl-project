#version 300 es
precision mediump float;
#define GLSLIFY 1

in vec2 position;
in vec2 textureCoords;
out vec2 texCoords;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

void main()
{
    gl_Position = projection * model * vec4(position, 0, 1) * view;
    texCoords = vec2(textureCoords.s, 1.0 - textureCoords.t);
}