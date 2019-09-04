class player {

    activeKey = 0;
    constructor(name) {
        this.points = 0;
        this.segments = 0;
        this.speed = 0;
        this.name = name;

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

        if (pressedKey == 97 && this.activeKey != 100) {
            this.snake.setDirection("Left")
        }
        if (pressedKey == 119 && this.activeKey != 115) {
            this.snake.setDirection("Backwards")

        }
        if (pressedKey == 100 && this.activeKey != 97) {
            this.snake.setDirection("Right")

        }
        if (pressedKey == 115 && this.activeKey != 119) {
            this.snake.setDirection("Forward")
        }
        this.activeKey = pressedKey
    }


}