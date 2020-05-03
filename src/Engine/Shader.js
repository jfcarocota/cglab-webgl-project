
export default class Shader{

    constructor(gl, vsSource, fsSource){
        
        return this.initShader(gl, vsSource, fsSource);
    }

    loadShader(gl, type, source){

        const shader = gl.createShader(type);
        const status = this.compileShader(gl, shader, source);

        if(!gl.getShaderParameter(shader, status)){
            this.shaderError(gl, shader);
        }

        return shader;
    }

    compileShader(gl, shader, source){
        
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        return gl.COMPILE_STATUS;
    }

    shaderError(gl, shader){
        const error = gl.getShaderInfoLog(shader);

        alert(`Unable to initialize the shader program: ${error}`);
        gl.deleteShader(shader);
    }

    async initShader(gl, vsSource, fsSource){
        
        const vs = gl.VERTEX_SHADER;
        const fs = gl.FRAGMENT_SHADER;
        const vsFile = await this.getFile(vsSource);
        const fsFile = await this.getFile(fsSource);
        const vertexShader = this.loadShader(gl, vs, vsFile);
        const fragmentShader = this.loadShader(gl, fs, fsFile);
        const program = gl.createProgram();
        const status = this.linkProgram(gl, program, vertexShader, fragmentShader);

        if(!gl.getProgramParameter(program, status)){
            this.programError(gl, program);
        }
        
        return program;
    }

    linkProgram(gl, program, vs, fs){

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        return gl.LINK_STATUS;      
    }

    programError(gl, program){

        const error = gl.getProgramInfoLog(program);

        alert(`Unable to initialize the Program: ${error}`);
        gl.deleteProgram(program);
    }

    async getFile(filePath){

        const file = await fetch(filePath).then(res => res.text().then(data => {return data}));

        if(!file){
            alert(`Warning: Loading of ${filePath} Failed!`);
        }

        return file;
    }
}