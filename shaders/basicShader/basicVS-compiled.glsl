#version 300 es
precision mediump float;
#define GLSLIFY 1

in vec2 position;
in vec3 color;
out vec3 vColor;

void main()
{
    gl_Position = vec4(position, 0, 1);
    vColor = color;
}