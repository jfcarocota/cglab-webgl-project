export default class Input{

    constructor(){

        this.Axes = {
            axis: {
                x: 0,
                y: 0
            }
        }

        this.startAxisListening(this.Axes.axis);
    }

    getAxis(){
        return this.Axes.axis;
    }

    startAxisListening(axis){
        addEventListener('keydown', e =>{
            switch(e.keyCode){
                case 39: 
                    axis.x = 1;
                    break;
                case 37: 
                    axis.x = -1;
                    break;
                case 38: 
                    axis.y = 1;
                    break;
                case 40: 
                    axis.y = -1;
                    break;
                default:
                    axis = {x: 0, y:0};
                    break;
            }
        });
    
        addEventListener('keyup', e =>{
            switch(e.keyCode){
                case 39: 
                    axis.x = 0;
                    break;
                case 37: 
                    axis.x = 0;
                    break;
                case 38: 
                    axis.y = 0;
                    break;
                case 40: 
                    axis.y = 0;
                    break;
            }
        });
    }
}