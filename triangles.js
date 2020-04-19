const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

// clear screen

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

//Declare shader

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

//Compile shader

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

const triangleCoords = [
    -0.5, -0.5, //0
    0.5, -0.5, //1
    0.0, 0.5 //2
];

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords), gl.STATIC_DRAW);
const position = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, gl.FALSE, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 3)
