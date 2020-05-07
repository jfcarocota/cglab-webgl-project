export default class Time{

    constructor(){
        this.time = Date.now();
        this.mDeltaTime = 0;
        this.updateTime();
    }

    updateTime(){

        this.mDeltaTime = (Date.now() - this.time) * 0.001;
        this.time = Date.now();
        requestAnimationFrame(this.updateTime.bind(this));
    }

    deltaTime(){
        
        return this.mDeltaTime;
    }
}