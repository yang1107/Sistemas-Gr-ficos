import * as THREE from '../libs/three.module.js'

class Trebol extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //crear trebol
    var trebol_shape = new THREE.Shape();
    trebol_shape.moveTo(2, 1);
    trebol_shape.quadraticCurveTo(1.5, 1, 1.5, 0.5);
    trebol_shape.quadraticCurveTo(1.5, 0, 2, 0);
    trebol_shape.quadraticCurveTo(2.5, 0, 2.5, 0.5);
    trebol_shape.quadraticCurveTo(2.5, 1, 2, 1);

    // Hoja inferior izquierda
    trebol_shape.moveTo(-0.5, 1);
    trebol_shape.quadraticCurveTo(-1, 1, -1, 0.5);
    trebol_shape.quadraticCurveTo(-1, 0, -0.5, 0);
    trebol_shape.quadraticCurveTo(0, 0, 0, 0.5);
    trebol_shape.quadraticCurveTo(0, 1, -0.5, 1);

    // Hoja superior
   trebol_shape.moveTo(1.25, 1);
   trebol_shape.quadraticCurveTo(1.25, 5.5);

    var trebol_material=new THREE.MeshNormalMaterial();
    var extrusion = {curveSegments: 30, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    var trebol_geometria=new THREE.ExtrudeBufferGeometry(trebol_shape,extrusion);

    this.trebol=new THREE.Mesh(trebol_geometria, trebol_material);
    this.add(this.trebol);

    //crear pie
    this.points=[];
    this.points.push(new THREE.Vector2(0.0,2.0));
    this.points.push(new THREE.Vector2(1.0,0.0));
    this.points.push(new THREE.Vector2(0.0,0.0));

    var pie_geometria= new THREE.LatheGeometry(this.points,10.0, 0.0, 2*Math.PI);
    var pie_material=new THREE.MeshNormalMaterial();
    this.pie = new THREE.Mesh(pie_geometria, pie_material);
    this.pie.position.x=0.8;
    this.pie.position.y=-2;
    this.pie.position.z=extrusion.depth/2;

    //aniadir pie como nodo de trebol
    this.trebol.add(this.pie);

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

export { Trebol }
