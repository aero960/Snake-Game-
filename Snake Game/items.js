class items extends gameObjects {
    durationTime;
    respawnTime = 3;
    lastRespawn = Date.now() / 1000;
}

class gameFruit extends items {

    constructor(name, look, speed, pkt, hp, respawnTime, durationTime, type) {
        super();
        this.look = look;
        this.name = name;
        this.speed = speed;
        this.points = pkt;
        this.health = hp;
        this.type = type;
        this.respawnTime = respawnTime;
        this.durationTime = durationTime * 1000;
    }

    addAttributes = () => {
        return { speed: this.speed, points: this.points, health: this.health }
    }

    fruitRespawn = () => {
        let date = Date.now() / 1000;
        if (date > this.lastRespawn) {

            this.lastRespawn = date + this.respawnTime;

            //console.log("this is good ?")
            let position = this.createFruit()
            this.deleteFruitAfterTime(position.x, position.y);
        }
    }

    deleteFruitAfterTime = (fruitLocationX, fruitLocationY) => {
        setTimeout(() => {
            this.context.clearRect(fruitLocationX, fruitLocationY, map.coordsX, map.coordsY);
            this.deleteLocationFruits(fruitLocationX, fruitLocationY);
        }, this.durationTime);
    }
    deleteLocationFruits = (corX, corY) => {
        for (let i = 0; i < this.positions.length; i++) {
            if (corX == this.positions[i].x && this.positions[i].y == corY)
                this.positions.splice(i, 1);
        }
    }





    createFruit = () => {
        this.addLocationFruits(this.position.x, this.position.y);
        this.createObject();
        return { x: this.position.x, y: this.position.y }
    }
    addLocationFruits = (corX, corY) => {
        this.positions.unshift({ x: corX, y: corY })
    }






};