import * as THREE from '../libs/three.module.js'

class Corazon_Columna extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //crear corazonCol
    var corazonCol_shape = new THREE.Shape();
    corazonCol_shape.moveTo(1.25,0.25);
    corazonCol_shape.quadraticCurveTo(-1.2,-0.7,1.25,2.0);
    corazonCol_shape.quadraticCurveTo(3.5,-0.7,1.25,0.25);


    var camino=[];
  /*  camino.push(new THREE.Vector3(-10, 0, 3));
    camino.push(new THREE.Vector3(0, 0, 0));
    camino.push(new THREE.Vector3(5, -2, 4));
    camino.push(new THREE.Vector3(10, 0, 8));*/

    camino.push(new THREE.Vector3(1, 3, 3));
    camino.push(new THREE.Vector3(1.5, 3.5, 3));
    camino.push(new THREE.Vector3(1.7, 4.2, 3));
    camino.push(new THREE.Vector3(1, 5, 3));

    var recorrido=new THREE.CatmullRomCurve3(camino);


    var corazonCol_material=new THREE.MeshNormalMaterial();
    var extrusion = {curveSegments: 30, steps: 1, extrudePath: recorrido, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    var corazonCol_geometria=new THREE.ExtrudeBufferGeometry(corazonCol_shape,extrusion);

    this.corazonCol=new THREE.Mesh(corazonCol_geometria, corazonCol_material);
    this.corazonCol.rotation.z=Math.PI;
    this.add(this.corazonCol);


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

export { Corazon_Columna }
