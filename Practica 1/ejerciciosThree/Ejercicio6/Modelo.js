import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Modelo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var that = this;

    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();

    materialLoader.load('../models/porsche911/911.mtl', function(materials){
      objectLoader.setMaterials (materials);
      objectLoader.load('../models/porsche911/Porsche_911_GT2.obj', function(object){
        var modelo = object;
        that.add(modelo);
      }, null, null );
    });

    this.position.y=0.7;

  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.rotY=0.0;
      this.animacion=false;
    }

    var folder=gui.addFolder(titleGui);
    folder.add(this.guiControls,'animacion').name('Animar');
  }

  update () {
    if(this.guiControls.animacion==true){
      this.guiControls.rotY+=0.01;
      this.rotation.y=this.guiControls.rotY;
    }
  }
}

export { Modelo }
