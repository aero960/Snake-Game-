"use strict"

window.addEventListener("load", () => {

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    context.width = 900;
    context.width = 900;




    let gameController = new mechanic();
    let Interface = new gameInterface();
    gameController.initializeGame(Interface, gameController);

    gameController.addPlayer();


    gameController.startGame();




    /*  let snake = new gameSnake("snake", "yellow", 10, interfaceGame);

      interfaceGame.ShowPoints();
      interfaceGame.ShowSegments();
      interfaceGame.ShowSpeed();
      let allItems = [
          new gameFruit("Green apple of great life", "green", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
          new gameFruit("Green apple of great life", "orange", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
          new gameFruit("Green apple of great life", "pink", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
          new gameFruit("Green apple of great life", "purple", 1, 10, 1, 1, 5, gameObjects.typeOfObject.item),
      ]*/











    //Game render
    gameController.render();
    //Game controller function
    gameController.controler();


})