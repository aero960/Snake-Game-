class player {

    activeKey = 0;
	controlKeys = {up : 115,down : 119,left : 97,right : 100};
	
    constructor(name,control) {
        this.points = 0;
        this.segments = 0;
        this.speed = 0;
        this.name = name;
		this.controlKeys = control;
	console.log(this.controlKeys.left + "to")
    }

    updateStats = (points, speed, health) => {
        this.points += points;
        this.segments = health;
        this.speed = speed;
        console.log(this.points, this.segments, this.speed)
    }

    assignSnake = (snake) => {
        this.snake = snake
    }

    createPlayerSnake = () => {
        this.snake.createSnake();
    }

    control = (pressedKey) => {

        if (pressedKey == this.controlKeys.left ) {
            this.snake.setDirection("Left")
        }
        if (pressedKey == this.controlKeys.down ) {
            this.snake.setDirection("Backwards")

        }
        if (pressedKey == this.controlKeys.right ) {
            this.snake.setDirection("Right")

        }
        if (pressedKey == this.controlKeys.up ) {
            this.snake.setDirection("Forward")
        }
        this.activeKey = pressedKey
    }


}