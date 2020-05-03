#version 300 es
precision mediump float;

out vec4 fragColor;
in vec3 vColor;

void main()
{
    fragColor = vec4(vColor, 1);
}