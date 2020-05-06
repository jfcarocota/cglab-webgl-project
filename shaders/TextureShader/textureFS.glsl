#version 300 es
precision mediump float;

out vec4 fragColor;
in vec2 texCoords;
uniform sampler2D image;

void main()
{
    fragColor = texture(image, texCoords);
    //fragColor = vec4(1, 0, 0, 1);

}