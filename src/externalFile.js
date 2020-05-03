
import Shader from './Engine/Shader/Shader.js';

const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

// clear screen


//Declare shader


const main = async ()=>{

    const program = await new Shader(gl, '../shaders/basicShader/basicVS.glsl', '../shaders/basicShader/basicFS.glsl');

    //Compile shader

    gl.useProgram(program);

    const triangleCoords = [
        -0.5, -0.5, 
        0.5, -0.5, 
        -0.5, 0.5, 
        0.5, 0.5
    ];

    const vertexColor = [
        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0,
        1, 0, 0
    ];

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

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

}

main();