import * as THREE from '../libs/three.module.js'

class Saltarina extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var cilindro_material = new THREE.MeshNormalMaterial({transparent:true, opacity:0.5});
    var cilindro_geometria = new THREE.CylinderGeometry(1,1,10,35);
    cilindro_geometria.translate(0,5,0);
    cilindro_material.flatShading = true;
    cilindro_material.needsUpdate = true;

    var esfera_material = new THREE.MeshNormalMaterial();
    var esfera_geometria= new THREE.SphereGeometry(0.5,30,30);
    this.bola=new THREE.Mesh(esfera_geometria,esfera_material);

    // Ya podemos construir el Mesh
    this.cilindro = new THREE.Mesh(cilindro_geometria, cilindro_material);

    this.bola_move=new THREE.Object3D();
    this.bola_move.add(this.bola);


    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cilindro);
    this.add(this.bola_move);


  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.radio = 1;
      this.altura=0;
      this.sube=true;

      this.rotY=0;
  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'radio', 1.0, 5, 0.1).name('Radio ').listen();
    //folder.add(this.guiControls, 'radio', 1.0, 5.0, 0.1).name('Radio ').onChange(function(value){that.rebuild()});
  }


  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    this.cilindro.scale.set (this.guiControls.radio,1,this.guiControls.radio);

    this.guiControls.rotY+=0.03;
    this.bola_move.rotation.set(0,this.guiControls.rotY,0);
    if(this.guiControls.sube==true){
      if(this.guiControls.altura<10){
        this.guiControls.altura+=0.3;
        this.bola.position.set(0,this.guiControls.altura,this.guiControls.radio);
      }
      else{
        this.guiControls.sube=false;
      }
    }
    else{
      if(this.guiControls.altura>0){
        this.guiControls.altura-=0.3;
        this.bola.position.set(0,this.guiControls.altura,this.guiControls.radio);
      }
      else{
        this.guiControls.sube=true;
      }
    }

  }


}

export { Saltarina }
