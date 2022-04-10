import * as THREE from '../libs/three.module.js'

class Corazon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //crear corazon
    var corazon_shape = new THREE.Shape();
    corazon_shape.moveTo(1.25,0.25);
    corazon_shape.quadraticCurveTo(-1.2,-0.7,1.25,2.0);
    corazon_shape.quadraticCurveTo(3.5,-0.7,1.25,0.25);


    var corazon_material=new THREE.MeshNormalMaterial();
    var extrusion = {curveSegments: 30, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    var corazon_geometria=new THREE.ExtrudeBufferGeometry(corazon_shape,extrusion);

    this.corazon=new THREE.Mesh(corazon_geometria, corazon_material);
    this.corazon.rotation.z=Math.PI;
    this.add(this.corazon);



  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.rotY=0.0;
      this.girocircular=0.0;
    }

  }

  update(){
    this.guiControls.rotY+=0.01;
    this.rotation.y=this.guiControls.rotY;
  }

}

export { Corazon }
