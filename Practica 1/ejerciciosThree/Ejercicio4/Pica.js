import * as THREE from '../libs/three.module.js'

class Pica extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //crear pica
    var pica_shape = new THREE.Shape();
    pica_shape.moveTo(1.25,0.25);
    pica_shape.quadraticCurveTo(-1.2,-0.7,1.25,2.0);
    pica_shape.quadraticCurveTo(3.5,-0.7,1.25,0.25);

    var pica_material=new THREE.MeshNormalMaterial();
    var extrusion = {curveSegments: 30, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    var pica_geometria=new THREE.ExtrudeBufferGeometry(pica_shape,extrusion);

    this.pica=new THREE.Mesh(pica_geometria, pica_material);
    this.add(this.pica);

    //crear pie
    this.points=[];
    this.points.push(new THREE.Vector2(0.0,2.0));
    this.points.push(new THREE.Vector2(1.0,0.0));
    this.points.push(new THREE.Vector2(0.0,0.0));

    var pie_geometria= new THREE.LatheGeometry(this.points,10.0, 0.0, 2*Math.PI);
    var pie_material=new THREE.MeshNormalMaterial();
    this.pie = new THREE.Mesh(pie_geometria, pie_material);
    this.pie.position.x=1.25;
    this.pie.position.y=-2.25;
    this.pie.position.z=extrusion.depth/2;

    //aniadir pie como nodo de pica
    this.pica.add(this.pie);

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

export { Pica }
