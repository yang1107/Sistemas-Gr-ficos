import * as THREE from '../libs/three.module.js'

class Peon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);


    this.points=[];

    this.points.push(new THREE.Vector3(0.0, -1.4, 0.0));
    this.points.push(new THREE.Vector3(1.0, -1.4, 0.0));
    this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
    this.points.push(new THREE.Vector3(0.5, -0.7, 0.0));
    this.points.push(new THREE.Vector3(0.4, -0.4, 0.0));
    this.points.push(new THREE.Vector3(0.4, 0.5, 0.0));
    this.points.push(new THREE.Vector3(0.5, 0.6, 0.0));
    this.points.push(new THREE.Vector3(0.3, 0.6, 0.0));
    this.points.push(new THREE.Vector3(0.5, 0.8, 0.0));
    this.points.push(new THREE.Vector3(0.55, 1.0, 0.0));
    this.points.push(new THREE.Vector3(0.5, 1.2, 0.0));
    this.points.push(new THREE.Vector3(0.3, 1.4, 0.0));
    this.points.push(new THREE.Vector3(0.0, 1.4, 0.0));

    var peon_material = new THREE.MeshNormalMaterial();
    var peon_geometria = new THREE.LatheGeometry(this.points, 3.0, 0.0, 2*Math.PI);
    peon_material.flatShading = true;
    peon_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.peon = new THREE.Mesh(peon_geometria, peon_material);

    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.peon);
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.resolucion = 3.0;
      this.angulo = 0;
  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'resolucion', 3.0, 15.0, 1.0).name('Resolucion ').onChange(function(value){that.rebuild()});
    folder.add(this.guiControls, 'angulo', Math.PI/180, 2*Math.PI, Math.PI/4).name('Angulo ').onChange(function(value){that.rebuild()});


  }

  update(){

  }


  rebuild(){
    var peon_geometria=new THREE.LatheGeometry(this.points,this.guiControls.resolucion,0, this.guiControls.angulo);
    this.peon.geometry=peon_geometria;
  }

  peonLinea(){
    var lineGeometry=new THREE.Geometry();
    lineGeometry.vertices=this.points;
    var lineMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
    this.line=new THREE.Line(lineGeometry, lineMaterial);

    return this.line;
  }

  peonMitad(){
    var peonM_material = new THREE.MeshNormalMaterial();
    var peonM_geometria = new THREE.LatheGeometry(this.points, 3.0, 0.0, Math.PI/Math.PI);
    peonM_material.flatShading = true;
    peonM_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.peonM = new THREE.Mesh(peonM_geometria, peonM_material);

    return this.peonM;
  }
}

export { Peon }
