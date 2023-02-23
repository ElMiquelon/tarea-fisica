import menu from "./menu.js";

export default class pantallaDeCarga extends Phaser.Scene{
    constructor(){
        super({key:'pantallaDeCarga'});
    };

    preload(){
        //aquí se cargan los recursos
        this.scene.add('menu', new menu);
        this.load.html('datos', './src/input.html');
        this.load.html('resul', './src/output.html');
        this.load.spritesheet('bebe', './assets/bebe.png', {frameWidth: 18, frameHeight: 27});
        this.load.image('backg', './assets/bg.png')
    };

    create(){
        //aqui se crean las animaciones
        this.anims.create({
            key:'bebestall',
            frames: this.anims.generateFrameNumbers('bebe', {frames:[0,1,2,3,4,5,6,7,8]}),
            frameRate:16,
            repeat:-1
        });
        this.anims.create({
            key:'bebefly',
            frames: this.anims.generateFrameNumbers('bebe', {frames:[10]})
        });
        this.anims.create({
            key:'bebewin',
            frames: this.anims.generateFrameNumbers('bebe', {frames:[9]})
        });
        
        this.scene.start('menu');
    };

};