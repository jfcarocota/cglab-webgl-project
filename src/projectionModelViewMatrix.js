const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

// clear screen

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

//Declare shader

const vertexShader = `#version 300 es
    precision mediump float;

    in vec2 position;
    in vec3 color;
    out vec3 vColor;
    uniform mat4 modelMatrix;
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;

    void main()
    {
        gl_Position = projectionMatrix * (modelMatrix * vec4(position, 0, 1)) * viewMatrix;
        vColor = color;
    }
`;

const fragmentShader = `#version 300 es
    precision mediump float;

    out vec4 fragColor;
    in vec3 vColor;

    void main()
    {
        fragColor = vec4(vColor, 1);
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
    -1, -1, 
    1, -1, 
    -1, 1, 
    1, 1
];

const vertexColor = [
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0,
    1, 0, 0
];

const modelMatrix = mat4.create();
const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();


mat4.translate(
    modelMatrix,
    modelMatrix,
    [0, 0, 0]
);

mat4.perspective(
    projectionMatrix,
    45 * (Math.PI / 180),
    canvas.clientWidth / canvas.clientHeight,
    -0.1,
    100
);

mat4.translate(
    viewMatrix,
    viewMatrix,
    [0, 0, 50]
);

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

const mMatrix = gl.getUniformLocation(program, 'modelMatrix');
gl.uniformMatrix4fv(mMatrix, false, modelMatrix);

const pMatrix = gl.getUniformLocation(program, 'projectionMatrix');
gl.uniformMatrix4fv(pMatrix, false, projectionMatrix);

const vMatrix = gl.getUniformLocation(program, 'viewMatrix');
gl.uniformMatrix4fv(vMatrix, false, viewMatrix);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords), gl.STATIC_DRAW);
const position = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, gl.FALSE, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColor), gl.STATIC_DRAW);
const color = gl.getAttribLocation(program, 'color');
gl.enableVertexAttribArray(color);
gl.vertexAttribPointer(color, 3, gl.FLOAT, gl.FALSE, 0, 0);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
