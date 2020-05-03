export default class ProgramLinker{

    constructor(gl, program, vs, fs){
        return this.linkProgram(gl, program, vs, fs);
    }

    linkProgram(gl, program, vs, fs){

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const status = gl.LINK_STATUS;     
        
        if(!gl.getProgramParameter(program, status)){
            this.programError(gl, program);
        }

        return program;
    }

    programError(gl, program){

        const error = gl.getProgramInfoLog(program);

        alert(`Unable to initialize the Program: ${error}`);
        gl.deleteProgram(program);
    }
}