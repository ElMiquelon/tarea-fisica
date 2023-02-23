var ang = null;
var g = null;
var v = null;
var xf;
var yf;
var tv;
export default class menu extends Phaser.Scene{
    constructor(){
        super({key:'menu'});
    };

    preload(){

    };

    create(){
        //aquí se crean la cámara, el proyectil y mundo
        this.physics.world.setBounds(0,-2000,10000,2000);
        this.bb = this.physics.add.sprite(0,0, 'bebe', 0).setOrigin(.5,1).setScale(.3,.3);
        this.cameras.main.startFollow(this.bb);
        this.bb.body.setBounceY(0);
        this.bb.setCollideWorldBounds(true,0,0);
        
        this.physics.add.staticGroup([
            this.add.rectangle(0,0,10000,200).setOrigin(0,0)
        ]);
        


        //he aquí el input
        this.datos = this.add.dom(0,0).createFromCache('datos').setScrollFactor(0);
        this.datos.setOrigin(0,0);
        this.datos.addListener('click');

        //el texto que dice "Por favor, ingrese valores válidos."
        this.warn = this.add.text(150,10,'Por favor, ingrese valores válidos.',{color:'white', fontSize:'20px'}).setVisible(false).setScrollFactor(0);
        
        //aqui se crea la wea que mostrará los resultados
        this.resul = this.add.dom(780,0).createFromCache('resul').setScrollFactor(0);
        this.resul.setOrigin(1,0).setVisible(false);
        
        //aquí se determina qué botón se está presionando
        this.datos.on('click', (event)=>{
            if (event.target.name == 'calcular'){
                //de esta forma se obtienen los datos que ingrese el usuario
                v = this.datos.getChildByName('velocidad');
                ang = this.datos.getChildByName('angulo');
                g = this.datos.getChildByName('gravedad');
                //aqui se verifica que el usuario haya introducido un dato
                if(v.value == '' || g.value == '' || ang.value == '' || v.value < 0 || g.value < 0 || ang.value < 0 || ang.value > 90){
                    this.warn.setVisible(true);
                }else{
                    this.warn.setVisible(false);
                    v = v.value
                    g = g.value
                    ang = ang.value * Math.PI/180
                    this.events.emit('lanzar');
                };
            }else if(event.target.name == 'reiniciar'){
                this.scene.restart();
            }
        });


        //un evento (similar a una función) que se lanza al cumplirse ciertos requerimientos.
        this.events.addListener('lanzar', ()=>{
            //se le dan las propiedades al proyectil.
            this.physics.velocityFromAngle((ang * (180/Math.PI))* -1, v, this.bb.body.velocity);
            this.bb.body.setGravity(0,g)

            //se hacen los calculos
            tv = ((2*v)/g) * Math.sin(ang);
            tv = tv.toFixed(2);
            xf = ((v**2)/g) * Math.sin(ang*2);
            xf = xf.toFixed(2);
            yf = ((v ** 2) / (2 * g)) * (Math.sin(ang) * Math.sin(ang));
            yf = yf.toFixed(2);

            //aquí se imprimen los valores en el html y posteriormente se vuelve visible
            this.resul.getChildByID('xf').innerHTML = "Distancia alcanzada: " + xf + "m";
            this.resul.getChildByID('yf').innerHTML = "Altura alcanzada: " + yf + "m";
            this.resul.getChildByID('tv').innerHTML = "Tiempo de vuelo: " + tv + "s";
            this.resul.setVisible(true);
        });

        this.mov = this.input.keyboard.createCursorKeys();
    };
    
    update(){
        console.log(this.bb.getBounds());
        if (this.bb.getBounds().y > -8.1){
            this.bb.body.setVelocity(0);
            this.bb.body.setAngularVelocity(0);
            this.bb.anims.play('bebewin');
        }else if(this.bb.getBounds().y != -8.1 && this.bb.getBounds().y < -8.1){
            this.bb.body.setAngularVelocity(v * 20)
            console.log("Esta volando")
        }
        /*if (this.mov.right.isDown){
            this.bb.body.setVelocityX(1000);
            
        }else if (this.mov.left.isDown){
            this.bb.body.setVelocityX(-1000);
            
        }else if (this.mov.up.isDown){
            this.bb.body.setVelocityY(-1000);
            
        }else if (this.mov.down.isDown){
            this.bb.body.setVelocityY(1000);
            
        }else{
            this.bb.setVelocity(0,0)
        }*/
    }
}