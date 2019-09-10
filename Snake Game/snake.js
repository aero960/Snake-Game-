"use strict"
class gameSnake extends gameObjects {
    numberSegments = 1000;
    pieceSegments = [];

    direction = {
        x: 0,
        y: 1
    };

    constructor(name, look, gameInterface, player, gameConsole) {
        super();
        this.lastMove = (Date.now() / 1000);
        this.name = name;
        this.look = look;
        this.type = gameObjects.typeOfObject.main;
        this.interfaceGame = gameInterface;
        this.velocity = mechanic.inverseNumber(10);
        this.player = player;
        this.gameConsole = gameConsole;
        for (let i = 0; i < this.numberSegments; i++)
            this.addSegment(this.position.x, this.position.y);
    }

    addBuffs = ({ speed, health }, item) => {
        console.log(this.numberSegments)
        this.addSegment(this.position.x, this.position.y)
        this.numberSegments += health;
        console.log(mechanic.inverseNumber(speed))
        this.velocity -= speed * 0.1;
        console.log(this.numberSegments)
        item.deleteLocationFruits(this.position.x, this.position.y);

    }

    findMyself = (arr) => {
        arr.forEach((element, index) => {
            if (element.position.x == this.position.x && element.position.y == this.position.y) {
                arr.splice(index, 1);
                return arr;
            }

        })
        return arr;

    }


    collision = (items) => {

        //   let tempArr = this.findMyself(items)
        let i = 0;

        items.forEach((element, index) => {

            element.positions.forEach((element, index) => {
                if (element.x == this.position.x && element.y == this.position.y) {
                    /*    if (element.type == 1) {
                            //add something good
                            //        this.addBuffs(items[i].addAttributdes(), items[i]);

                        }*/
                    if (items[i].type == 2) {
                        //add something good
                        this.addBuffs(items[index].addAttributes(), items[index]);

                        this.player.updateStats(10, this.velocity, this.numberSegments)
                    }
                    if (items[i].type == 3) {
                        //do something bad
                        this.gameConsole.endGame();
                        this.destroySnake();
                    }
                }
            })
            i++
        })


        //auto snake collision

        for (let i = 0; i < this.positions.length; i++) {
            if ((this.pieceSegments[i].x == this.position.x && this.pieceSegments[i].y == this.position.y) && i > 1) {
                //endGame
                console.log("end game")
                this.gameConsole.endGame();
                this.destroySnake();
            }
        }
        //przechodzenie przez sciany
        if (this.position.x > map.mapWidth || this.position.x < 0 || this.position.y > map.mapHeight || this.position.y < 0) {
            if (this.position.x > map.mapWidth && (this.direction.x == 1))
                this.position.x = -map.coordsX;

            if (this.position.y > map.mapHeight && (this.direction.y == 1))
                this.position.y = -map.coordsY;

            if (this.position.x < 0 && (this.direction.x == -1))
                this.position.x = map.mapWidth;

            if (this.position.y < 0 && (this.direction.y == -1))
                this.position.y = map.mapHeight;
        }
    }

    update = (items, snakePosition) => {
        let date = Date.now() / 1000;
        if (date >= this.lastMove) {
            this.lastMove += this.velocity;

            this.move();
            this.collision(items);
        }
    }

    move = () => {
        //trzeba chyba dodac petle zeby pozbyc sie błedu
        this.setPosition(this.position.x + (map.coordsX * this.direction.x), this.position.y + (map.coordsY * this.direction.y))
        this.addSegment(this.position.x, this.position.y);

        for (let i = 0; i < this.numberSegments; i++) {
            this.createSegment(this.pieceSegments[i].x, this.pieceSegments[i].y)
        }
        this.clearTail();
    }

    destroySnake = () => {
        let speed = 100;
        this.pieceSegments.forEach(((element, index) => {
            if (index != this.pieceSegments.length - 1)
                setTimeout(() => {
                    this.context.clearRect(this.pieceSegments[this.pieceSegments.length - 1 - index].x, this.pieceSegments[this.pieceSegments.length - 1 - index].y, map.coordsX, map.coordsY);
                    if (index == this.pieceSegments.length - 1)
                        this.pieceSegments.length = 0;
                }, 20 * index);

        }))
    }

    //tworzenie segmentu
    createSegment = (x, y) => {
        this.context.beginPath();
        this.context.fillStyle = this.look;
        this.context.rect(this.position.x, this.position.y, map.coordsX, map.coordsY);
        this.context.fill();
        this.context.closePath();
    }


    addSegment = (corX, corY) => {
        this.pieceSegments.unshift({ x: corX, y: corY })
        this.positions = this.pieceSegments;
    }

    clearTail = () => {
        let LastSegmentX = this.pieceSegments[this.pieceSegments.length - 1].x;
        let LastSegmentY = this.pieceSegments[this.pieceSegments.length - 1].y;
        for (let i = 0; i < this.pieceSegments.length; i++) {
            if (i > this.numberSegments)
                this.context.clearRect(this.pieceSegments[i].x, this.pieceSegments[i].y, map.coordsX, map.coordsY);
        }
        this.pieceSegments.length = this.numberSegments + 1;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    createSnake = () => {
        this.createObject();
        this.addSegment(this.position.x, this.position.y)
    }

    setDirection = (option) => {
        if (option == "Forward") {
            this.direction.x = 0;
            this.direction.y = 1;
        }
        if (option == "Backwards") {
            this.direction.x = 0;
            this.direction.y = -1;
        }
        if (option == "Left") {
            this.direction.x = -1;
            this.direction.y = 0;
        }
        if (option == "Right") {
            this.direction.x = 1;
            this.direction.y = 0;
        }
        if (option == "Stop") {
            this.direction.x = 0;
            this.direction.y = 0;
        }
    }




}