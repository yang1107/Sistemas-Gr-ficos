import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'

class Taza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //cilindro grande de fuera
    var cilindroG_geom=new THREE.CylinderGeometry(1,1,2,20);


    //cilindro pequenia de dentro
    var cilindroP_geom=new THREE.CylinderGeometry(0.9,0.9,1.75,20);
    cilindroP_geom.translate(0,0.15,0);


    var asa_geometria=new THREE.TorusGeometry(0.5,0.2,10,20);
    asa_geometria.translate(-1,0,0);


    var cilindroG_BSP=new ThreeBSP(cilindroG_geom);
    var cilindroP_BSP=new ThreeBSP(cilindroP_geom);
    var asa_BSP=new ThreeBSP(asa_geometria);

    var resultado1=asa_BSP.union(cilindroG_BSP);
    var resultadoFinal=resultado1.subtract(cilindroP_BSP);

    var taza_material = new THREE.MeshNormalMaterial();
    this.taza=resultadoFinal.toMesh(taza_material);

    this.add(this.taza);

  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.rotY=0.0;
    }
  }

  update () {
    this.guiControls.rotY+=0.01;
    this.rotation.y=this.guiControls.rotY;
  }
}

export { Taza }
