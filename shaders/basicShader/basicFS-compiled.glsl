#version 300 es
precision mediump float;
#define GLSLIFY 1

out vec4 fragColor;
in vec3 vColor;

void main()
{
    fragColor = vec4(vColor, 1);
}