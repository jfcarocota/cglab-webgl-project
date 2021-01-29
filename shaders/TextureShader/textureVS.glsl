#version 300 es
precision mediump float;

in vec2 position;
in vec2 textureCoords;
out vec2 texCoords;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform bool flipX;

void main()
{
    gl_Position = projection * model * vec4(position, 0, 1) * view;
    if(!flipX)
    {
        texCoords = vec2(textureCoords.s, 1.0 - textureCoords.t);
    }
    else
    {
        texCoords = vec2(1.0 - textureCoords.s, 1.0 - textureCoords.t);
    }
}