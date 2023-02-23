import pantallaDeCarga from "./pantallaDeCarga.js";

const config ={
    width: 800,
    height: 400,
    parent: "contenedor",
    type: Phaser.AUTO,
    scene:[pantallaDeCarga],
    dom:{
        createContainer: true
    },
    physics:{
        default: "arcade",
        arcade:{
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xff0000,
            debugBodyColor: 0xff0000,
            debugStaticBodyColor: 0xff00ff
        }
    }
}

var game = new Phaser.Game(config);