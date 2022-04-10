import * as THREE from '../libs/three.module.js'

class Cubo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var cubo_material = new THREE.MeshNormalMaterial();
    var cubo_geom = new THREE.BoxGeometry(1,1,1);
    cubo_material.flatShading = true;
    cubo_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.cubo = new THREE.Mesh(cubo_geom, cubo_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cubo);
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.tamX = 1.0;
      this.tamY = 1.0;
      this.tamZ = 1.0;

      this.rotZ=0.0;
    }

    var folder=gui.addFolder(titleGui);
    folder.add(this.guiControls, 'tamX', 0.1, 10.0, 0.5).name('Tamanio X ').listen();
    folder.add(this.guiControls, 'tamY', 0.1, 10.0, 0.5).name('Tamanio y ').listen();
    folder.add(this.guiControls, 'tamZ', 0.1, 10.0, 0.5).name('Tamanio Z ').listen();

  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.rotZ += 0.01;
    this.scale.set (this.guiControls.tamX,this.guiControls.tamY,this.guiControls.tamZ);
    this.rotation.set (0.0,0.0,this.guiControls.rotZ);
  }
}

export { Cubo }
