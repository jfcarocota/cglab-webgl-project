const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShader = `#version 300 es
    precision mediump float;

    in vec2 position;

    void main()
    {
        gl_Position = vec4(position, 0, 1);
    }
`;

const fragmentShader = `#version 300 es
    precision mediump float;

    out vec4 fragColor;

    void main()
    {
        fragColor = vec4(1, 1, 1, 1);
    }
`;

const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vs, vertexShader);
gl.shaderSource(fs, fragmentShader);
gl.compileShader(vs);
gl.compileShader(fs);

if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(vs));
}

if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(fs));
}

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);