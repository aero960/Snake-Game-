"use strict"
class gameObjects {
    static typeOfObject = {
        main: 1,
        item: 2,
        obstacle: 3
    }
    positions = [];

    position = {
        x: 0,
        y: 0
    };
    context;

    createObject = () => {
        //random position of object
        this.position.x = mechanic.getRandomInt(0, map.coordsX) * map.coordsY;
        this.position.y = mechanic.getRandomInt(0, map.coordsY) * map.coordsY;

        this.context = mechanic.context;
        this.context.beginPath();
        this.context.fillStyle = this.look;
        this.context.rect(this.position.x, this.position.y, map.coordsX, map.coordsY);
        this.context.fill();
        this.context.closePath()
    }

}