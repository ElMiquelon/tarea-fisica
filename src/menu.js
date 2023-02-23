var ang = null;
var g = null;
var v = null;
var xf;
var yf;
var tv;
var ts;
var pi;
var pc;
var pf;
export default class menu extends Phaser.Scene{
    constructor(){
        super({key:'menu'});
    };

    preload(){

    };

    create(){
        //aquí se crean la cámara, el proyectil y mundo
        this.physics.world.setBounds(0,-400,800,400);
        this.centro = this.add.rectangle(400,-200,1,1);
        this.cameras.main.startFollow(this.centro)
        this.add.image(0,0,'backg').setOrigin(0,1);

        this.linea = this.add.graphics();
        


        //he aquí el input
        this.datos = this.add.dom(0,0).createFromCache('datos').setScrollFactor(0);
        this.datos.setOrigin(0,0);
        this.datos.addListener('click');

        //el texto que dice "Por favor, ingrese valores válidos."
        this.warn = this.add.text(150,10,'Por favor, ingrese valores válidos.',{color:'black', backgroundColor:'white', fontSize:'20px'}).setVisible(false).setScrollFactor(0);
        
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
            

            //se hacen los calculos
            tv = ((2*v)/g) * Math.sin(ang);
            tv = tv.toFixed(2);
            xf = ((v**2)/g) * Math.sin(ang*2);
            xf = xf.toFixed(2);
            yf = ((v ** 2) / (2 * g)) * (Math.sin(ang) * Math.sin(ang));
            yf = yf.toFixed(2);


            ts = tv/2;
            ts = ts.toFixed(2);

            console.log(ts);
            
            //aqui se dibuja el gráfico
            pi = new Phaser.Math.Vector2(0,0);
            pc = new Phaser.Math.Vector2((v*ts*Math.cos(ang)).toFixed(2), (yf*-1)*2);
            pf = new Phaser.Math.Vector2(xf,0);
            this.gra = new Phaser.Curves.QuadraticBezier(pi,pc,pf);
            this.linea.clear();
            this.linea.lineStyle(1, 0x0000ff, 1)
            this.gra.draw(this.linea)
            
            this.add.circle((v*ts*Math.cos(ang)).toFixed(2), yf*-1,.5,0x0000ff);
            this.add.circle(xf, 0, .5, 0x00ff00);


            //aquí se imprimen los valores en el html y posteriormente se vuelve visible
            this.resul.getChildByID('xf').innerHTML = "Distancia alcanzada: " + xf + "m";
            this.resul.getChildByID('yf').innerHTML = "Altura alcanzada: " + yf + "m";
            this.resul.getChildByID('tv').innerHTML = "Tiempo de vuelo: " + tv + "s";
            this.resul.setVisible(true);
        });

        this.mov = this.input.keyboard.createCursorKeys();
    };
    
    update(){
        if(this.mov.down.isDown){
            this.cameras.main.zoom = 5
        }
    }
}