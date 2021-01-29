
import Time from './Time.js';

export default class Animation{

    constructor(name, framesCount, start, startHeight, step, height, speed){

        this.name = name;
        this.framesCount = framesCount;
        this.step = step;
        this.height = height;
        this.speed = speed;
        this.frame = 0;

        this.start = start;
        this.end = step;
        this.startHeight = startHeight;

        this.time = new Time();

        this.texCoords = [];
        this.timeElapsed = speed;
        this.animationId = {};
        this.isPlaying = false;

        this.initValues = {
            end: step,
            start: start
        }
    }

    play(){

        this.timeElapsed += this.time.deltaTime();
        this.isPlaying = true;

        if(this.timeElapsed >= (60 * this.time.deltaTime()) / this.speed){
            this.start += this.step;
            this.end += this.step;

            this.setFrame();

            if(this.frame === this.framesCount - 1){
                this.resetAnimation();
            }

            this.frame += 1;
            this.timeElapsed = 0;
        }

        this.animationId = requestAnimationFrame(this.play.bind(this));
    }

    stop(){
        this.isPlaying = false;
        cancelAnimationFrame(this.animationId);
        this.resetAnimation();
    }


    resetAnimation(){
        this.end = this.initValues.end;
        this.start = this.initValues.start;
        this.frame = 0;

        this.setFrame();
    }

    setFrame(){
        this.texCoords =[
            this.start, this.startHeight,
            this.end, this.startHeight,
            this.start, this.height,
            this.end, this.height
        ]
    }

    getTexCoords(){
        return this.texCoords;
    }
}