export default class CompileShader{

    constructor(gl, shader, source, status){
        return this.compileShader(gl, shader, source)
    }

    compileShader(gl, shader, source){
        
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        const status = gl.COMPILE_STATUS;

        if(!gl.getShaderParameter(shader, status)){
            this.shaderError(gl, shader);
        }

        return shader;
    }

    shaderError(gl, shader){

        const error = gl.getShaderInfoLog(shader);

        alert(`Unable to initialize the shader program: ${error}`);
        gl.deleteShader(shader);
    }

}