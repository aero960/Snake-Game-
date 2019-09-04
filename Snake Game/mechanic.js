"use strict"
class mechanic {

    static typeAlerts = {
        SUCCESS: 'alert-success',
        DANGER: 'alert-danger',
    }
    static context;
    static gameInterface;
    collisionMap = [];

    allItems = [
        new gameFruit("Green apple of great life", "green", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
        new gameFruit("Green apple of great life", "orange", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
        new gameFruit("Green apple of great life", "pink", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
        new gameFruit("Green apple of great life", "purple", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
    ]

    play = true;
    players = [];
    constructor() {

    }


    pointerFinder = () => {
        let tempArrPlayers = [];
        let tempArrItems = [];
        /*  this.players.forEach((element, index) => {
              tempArrPlayers.push(element.snake)
          })*/
        this.allItems.forEach((element, index) => {
            tempArrItems.push(element)
        })
        this.collisionMap = [...tempArrPlayers, ...tempArrItems]
    }



    render = () => {
        if (this.play) {
            this.pointerFinder();
            this.players.forEach((element, index) => {
                element.snake.update(this.collisionMap);
            })
            this.allItems.forEach((element, index) => {
                element.fruitRespawn();
            })

        }
        this.interfaceUpdate();
        window.requestAnimationFrame(this.render);
    }

    interfaceUpdate = () => {

        this.interfaceGameRef.clearInterface();
        this.interfaceGameRef.ShowPoints(this.players[0].points);
        this.interfaceGameRef.ShowSegments(this.players[0].points);
        this.interfaceGameRef.ShowSpeed(this.players[0].points);
    }


    initializeGame = (gameInterface, gameConsole) => {
        let canvasInterface = document.getElementById("interface");
        let canvas = document.getElementById("canvas");

        this.interfaceGameRef = gameInterface;
        this.consoleGameRef = gameConsole;

        mechanic.context = canvas.getContext('2d');
        mechanic.context.width = 900;
        mechanic.context.height = 900;
        mechanic.gameInterface = canvasInterface.getContext('2d');
        mechanic.gameInterface.width = map.mapWidth;
        mechanic.gameInterface.height = map.mapHeight;
    }

    addPlayer = () => {
        let newPlayer = new player("hejka")
        newPlayer.assignSnake(new gameSnake("rufus", "orange", this.interfaceGameRef, newPlayer, this.consoleGameRef));
        this.players.push(newPlayer)
    }

    showGameInterface = () => {
        mechanic.gameInterface.showPoints();
    }
    startGame = () => {

        this.play = true;
        if (this.players.length != 0)
            this.players.forEach((element, index) => {
                this.players[index].createPlayerSnake();
            })
        this.render()
    }

    endGame = () => {
        this.play = false;
    }

    //nothing interesing

    controler = () => window.addEventListener("keypress", ((e) => {
        this.players.forEach((element, index) => {
            this.players[index].control(e.keyCode);
        })
    }))



    static inverseNumber = (number) => {

        return 1.0 / number;
    }

    static getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}