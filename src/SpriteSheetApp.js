
import Shader from './Engine/Shader/Shader.js';
import Texture from './Engine/Texture.js';
import Time from './Engine/Time.js';
import Animation from './Engine/Animation.js';
import Input from './Engine/Input.js';

const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

// clear screen


//Declare shader


const main = async ()=>{

    const program = await new Shader(gl, '../shaders/TextureShader/textureVS.glsl', '../shaders/TextureShader/textureFS.glsl');

    //Compile shader

    gl.useProgram(program);

    const scale = 0.02;
    const spWidth = ((137 * scale) / 2) / 6;
    const spHeight = ((50 * scale) / 2) / 3;

    const texWidth = 1/6;
    const texHeight = 1/3;

    const appInfo = {
        moveSpeed: 2,
        triangleCoords: [
            -spWidth, -spHeight, //0, 0
            spWidth, -spHeight, //1, 0
            -spWidth, spHeight, //-1, 1
            spWidth, spHeight //1, 1
        ],
        textureCoords:[
            0, 0,
            texWidth, 0,
            0, texHeight,
            texWidth, texHeight
        ],
        buffers: {
            positionBuffer: gl.createBuffer(),
            textureBuffer: gl.createBuffer()
        },
        attribs: {
            position: gl.getAttribLocation(program, 'position'),
            texturePosition: gl.getAttribLocation(program, 'textureCoords')
        },
        uniforms:{
            model: gl.getUniformLocation(program, 'model'),
            view: gl.getUniformLocation(program, 'view'),
            projection: gl.getUniformLocation(program, 'projection')
        },
        matrices: {
            modelMatrix: mat4.create(),
            viewMatrix: mat4.create(),
            projectionMatrix: mat4.create()
        },
        textures: [
            new Texture(gl, 'images/catspritesoriginal.gif')
        ],
        flipX: false,
        time: new Time(),
        input: new Input(),
        animations: [
            new Animation('run', 6, 0, 0, texWidth, texHeight, 13),
            new Animation('idle', 1, 0, texHeight * 2, texWidth, texHeight * 3, 1)
        ]
    }

    //gl.uniform1f(appInfo.flipX, 0);


    //Running animation state starts

    const runAnim = appInfo.animations[0];
    runAnim.play();
    const idleAnim = appInfo.animations[1];
    //idleAnim.play();

    /*canvas.addEventListener('click', ()=>{
        if(runAnim.isPlaying){
            runAnim.stop();
        }else{
            runAnim.play();
        }
    });*/
    //Running animation state ends

    mat4.perspective(
        appInfo.matrices.projectionMatrix,
        canvas.clientWidth / canvas.clientHeight,
        45 * (Math.PI / 180),
        -0.1,
        100
    );

    mat4.translate(
        appInfo.matrices.viewMatrix,
        appInfo.matrices.viewMatrix,
        [0, 0, 10]
    );

    const update = ()=>{

        mat4.translate(
            appInfo.matrices.modelMatrix,
            appInfo.matrices.modelMatrix,
            [appInfo.time.deltaTime() * appInfo.input.getAxis().x * appInfo.moveSpeed, 0, 0]
        );

        //console.log(appInfo.time.deltaTime());
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        //vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, appInfo.buffers.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(appInfo.triangleCoords), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(appInfo.attribs.position);
        gl.vertexAttribPointer(appInfo.attribs.position, 2, gl.FLOAT, gl.FALSE, 0, 0);

        //texture
        gl.bindBuffer(gl.ARRAY_BUFFER, appInfo.buffers.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(runAnim.getTexCoords()), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(appInfo.attribs.texturePosition);
        gl.vertexAttribPointer(appInfo.attribs.texturePosition, 2, gl.FLOAT, gl.FALSE, 0, 0);

        //flipX
        //gl.uniform1i(appInfo.flipX, appInfo.input.getAxis().x > 0 ? 0 : appInfo.input.getAxis().x < 0 ? 1 : appInfo.flipX);
        //gl.uniform1i(appInfo.flipX, 0);

        const flipX = gl.getUniformLocation(program, 'flipX');
        appInfo.flipX = appInfo.input.getAxis().x > 0 ? true : appInfo.input.getAxis().x < 0 ? false : appInfo.flipX;
        //gl.uniform1i(appInfo.flipX, 0);
        gl.uniform1i(flipX, appInfo.flipX);


        gl.uniformMatrix4fv(appInfo.uniforms.projection, false, appInfo.matrices.projectionMatrix);
        gl.uniformMatrix4fv(appInfo.uniforms.model, false, appInfo.matrices.modelMatrix);
        gl.uniformMatrix4fv(appInfo.uniforms.view, false, appInfo.matrices.viewMatrix);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, appInfo.textures[0]);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(update);
    }

    update();

}

main();