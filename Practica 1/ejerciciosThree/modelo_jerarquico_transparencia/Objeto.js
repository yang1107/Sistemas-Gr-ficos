import * as THREE from '../libs/three.module.js'

class Objeto extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.altura=10;
    var ancho_prof=1;
    var material = new THREE.MeshNormalMaterial();
    var caja1_geom = new THREE.BoxGeometry(ancho_prof,this.altura,ancho_prof);
    caja1_geom.translate(0,-this.altura/2,0);
    material.flatShading = true;
    material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.cajaA = new THREE.Mesh(caja1_geom, material);
    this.cajaB = new THREE.Mesh(caja1_geom, material);




    // Y añadirlo como hijo del Object3D (el this)

    this.add(this.cajaA);
    this.add(this.cajaB);

  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.longA = 1.0;
      this.longB = 1.0;
      this.rotA = 0;
      this.rotB=0;

    }

    var folder=gui.addFolder(titleGui);
    folder.add(this.guiControls, 'longA', 1.0, 2.0, 0.1).name('Longitud A ').listen();
    folder.add(this.guiControls, 'rotA', -Math.PI/4, Math.PI/4, 0.01).name('Giro A ').listen();
    folder.add(this.guiControls, 'longB', 1.0, 2.0, 0.1).name('Longitud B ').listen();
    folder.add(this.guiControls, 'rotB', -Math.PI/4, Math.PI/4, 0.01).name('Giro B ').listen();
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.cajaA.scale.set (1,this.guiControls.longA,1);
    this.rotation.set (0.0,0.0,this.guiControls.rotA);
    this.cajaB.position.y=-this.altura*this.guiControls.longA;
    this.cajaB.scale.set (1,this.guiControls.longB,1);
    this.cajaB.rotation.set (0.0,0.0,this.guiControls.rotB);
  }
}

export { Objeto }
