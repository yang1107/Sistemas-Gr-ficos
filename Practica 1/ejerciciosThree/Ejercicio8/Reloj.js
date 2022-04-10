import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var material_bolas=new THREE.MeshPhongMaterial({color: 0x00FF00});
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000});

    var geometria= new THREE.SphereGeometry(1,30,30);

    var bola1=new THREE.Mesh(geometria,material_bolas);
    bola1.position.set(6.9, 0.0, -10.7);

    var bola2=new THREE.Mesh(geometria,material_bolas);
    bola2.position.set(10.8, 0.0, -6.6);

    var bola3=new THREE.Mesh(geometria,material_bolas);
    bola3.position.set(12,0,0);

    var bola4=new THREE.Mesh(geometria,material_bolas);
    bola4.position.set(10.8, 0.0, 6.6);

    var bola5=new THREE.Mesh(geometria,material_bolas);
    bola5.position.set(6.9, 0.0, 10.7);

    var bola6=new THREE.Mesh(geometria,material_bolas);
    bola6.position.set(0,0,12);

    var bola7=new THREE.Mesh(geometria,material_bolas);
    bola7.position.set(-6.9, 0.0, 10.7);

    var bola8=new THREE.Mesh(geometria,material_bolas);
    bola8.position.set(-10.8, 0.0, 6.6);

    var bola9=new THREE.Mesh(geometria,material_bolas);
    bola9.position.set(-12,0,0);

    var bola10=new THREE.Mesh(geometria,material_bolas);
    bola10.position.set(-10.8, 0.0, -6.6);

    var bola11=new THREE.Mesh(geometria,material_bolas);
    bola11.position.set(-6.9, 0.0, -10.7);

    var bola12=new THREE.Mesh(geometria,material_bolas);
    bola12.position.set(0,0,-12);

    this.bola=new THREE.Mesh(geometria,mat_rojo);
    this.bola.position.set(0,0,-9);

    this.bola_move=new THREE.Object3D();
    this.bola_move.add(this.bola);

    // Y añadirlo como hijo del Object3D (el this)

    this.add(bola1);
    this.add(bola2);
    this.add(bola3);
    this.add(bola4);
    this.add(bola5);
    this.add(bola6);
    this.add(bola7);
    this.add(bola8);
    this.add(bola9);
    this.add(bola10);
    this.add(bola11);
    this.add(bola12);
    this.add(this.bola_move);


  }


  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.rotY= 0;
      this.velocidad=1;
      this.tiempoAnterior=Date.now();
    }

    var folder=gui.addFolder(titleGui);
    folder.add(this.guiControls, 'velocidad', -12, 12, 1).name('Velocidad ').listen();

  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    var tiempoActual=Date.now();
    var segundosTranscurridos=(tiempoActual-this.guiControls.tiempoAnterior)/1000;
    this.guiControls.rotY-=this.guiControls.velocidad*segundosTranscurridos;
    this.bola_move.rotation.y=this.guiControls.rotY;
    this.guiControls.tiempoAnterior=tiempoActual;
  }
}

export { Reloj }
