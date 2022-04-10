import * as THREE from '../libs/three.module.js'

class Diamante extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //crear pica
    var diamante_shape = new THREE.Shape();
    diamante_shape.moveTo(-0.5,0);
    diamante_shape.lineTo(0,-1);
    diamante_shape.lineTo(0.5,0);
    diamante_shape.lineTo(0,1);
    diamante_shape.lineTo(-0.5,0);


    var diamante_material=new THREE.MeshNormalMaterial();
    var extrusion = {curveSegments: 30, steps: 1, depth: 0.5, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    var diamante_geometria=new THREE.ExtrudeBufferGeometry(diamante_shape,extrusion);
    //var diamante_geometria = new THREE.ShapeGeometry(diamante_shape);

    this.diamante=new THREE.Mesh(diamante_geometria, diamante_material);
    this.add(this.diamante);
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.rotY=0.0;
    }

  }

  update(){
    this.guiControls.rotY+=0.01;
    this.rotation.y=this.guiControls.rotY;
  }

}

export { Diamante }
