class gameInterface {


    constructor() {
        this.context = mechanic.gameInterface;
    }
    clearInterface = () => {
        mechanic.gameInterface.clearRect(0, 0, 200, 120)
    }

    ShowPoints = (points) => {

        mechanic.gameInterface.font = "30px Arial";
        mechanic.gameInterface.fillStyle = 'white';
        mechanic.gameInterface.fillText(`Points: ${points} `, 20, 40)
    }
    ShowSegments = (segments) => {
        mechanic.gameInterface.font = "30px Arial";
        mechanic.gameInterface.fillStyle = 'red';
        mechanic.gameInterface.fillText(`Long: ${segments} `, 20, 80)
    }
    ShowSpeed = (speed) => {
        mechanic.gameInterface.font = "30px Arial";
        mechanic.gameInterface.fillStyle = 'blue';
        mechanic.gameInterface.fillText(`speed: ${speed} `, 20, 120)
    }

    ShowAddedPoints = (points, x, y) => {
        this.AnimateText(points, x, y, 0);

        setTimeout(() => {
            this.context.clearRect(x, y, 60, -30)
        }, 2000);
    }


    AnimateText = (text, x, y, height) => {
        let i = 0;

        this.context.font = "30px Arial";
        this.context.fillStyle = 'red';
        this.context.fillText(`+ ${text}`, x, y)
        let fx = (x, speed) => {
            return {
                equal: (x + speed),
                constSpeed: speed = (speed + 0.5) * 0.05
            };
        }
        let speedAnimation = fx(1, 1).constSpeed;
        let constX = fx(1, 1).equal;
        let interval = setInterval(() => {
            i++
            this.context.clearRect(x, y, 60, -40)
            this.context.font = "30px Arial";
            this.context.fillStyle = 'red';
            this.context.fillText(`+ ${text}`, x, y)

            speedAnimation = fx(speedAnimation, constX).constSpeed;
            constX = fx(speedAnimation, constX).equal;
            y -= fx(speedAnimation, constX).equal;


            if (i > height) {
                clearInterval(interval)
            }

        }, 100);
        return y;
    }

}