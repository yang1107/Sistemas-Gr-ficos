import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'

class Escuadra extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var caja_shape = new THREE.Shape();
    caja_shape.moveTo(2,0);
    caja_shape.lineTo(0,0);
    caja_shape.lineTo(0,1.15);
    caja_shape.quadraticCurveTo(0,2,0.5,2.0);
    caja_shape.lineTo(2,2);

    var caja_material=new THREE.MeshNormalMaterial();
    var extrusion = {curveSegments: 12, steps: 1, depth: 2, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 6}
//     var extrusion = {curveSegments: 30, steps: 1, depth: 2, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    var caja_geometria=new THREE.ExtrudeGeometry(caja_shape,extrusion);


    //crear caja grande
    var cajaG_geometria=new THREE.BoxGeometry(3.8,3.8,2.3);
    cajaG_geometria.translate(0.6,1.4,1);

    //crear agujeros
    var agujero1_geometria=new THREE.CylinderGeometry(0.3,0.3,1,15);
    var agujero2_geometria=new THREE.CylinderGeometry(0.3,0.3,1,15);
    var agujero_material=new THREE.MeshNormalMaterial();

    agujero1_geometria.translate(1,3,1);

    agujero2_geometria.rotateZ(Math.PI/2);
    agujero2_geometria.translate(-1,1.2,1);

    var caja_BSP=new ThreeBSP(caja_geometria);
    var cajaG_BSP=new ThreeBSP(cajaG_geometria);
    var agujero1_BSP=new ThreeBSP(agujero1_geometria);
    var agujero2_BSP=new ThreeBSP(agujero2_geometria);


    var resultado1=cajaG_BSP.subtract(caja_BSP);
    var resultado2=resultado1.subtract(agujero1_BSP);
    var resultadoFinal=resultado2.subtract(agujero2_BSP);

    this.escuadra=resultadoFinal.toMesh(caja_material);
    this.add(this.escuadra);

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

export { Escuadra }
