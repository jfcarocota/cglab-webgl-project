import ShaderCompiler from './CompileShader.js';
import ProgramLinker from './ProgramLinker.js';


export default class Shader{

    constructor(gl, vsSource, fsSource){
        
        return this.initShader(gl, vsSource, fsSource);
    }

    loadShader(gl, type, source){

        const shader = gl.createShader(type);

        return new ShaderCompiler(gl, shader, source, status);
    }

    async initShader(gl, vsSource, fsSource){
        
        const vs = gl.VERTEX_SHADER;
        const fs = gl.FRAGMENT_SHADER;
        const vsFile = await this.getFile(vsSource);
        const fsFile = await this.getFile(fsSource);
        const vertexShader = this.loadShader(gl, vs, vsFile);
        const fragmentShader = this.loadShader(gl, fs, fsFile);
        const program = gl.createProgram();
        
        return new ProgramLinker(gl, program, vertexShader, fragmentShader);
    }

    async getFile(filePath){

        const file = await fetch(filePath).then(res => res.text().then(data => {return data}));

        if(!file){
            alert(`Warning: Loading of ${filePath} Failed!`);
        }

        return file;
    }
}