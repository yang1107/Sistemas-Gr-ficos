import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var esfera_material = new THREE.MeshNormalMaterial();
    var esfera_geometria = new THREE.SphereGeometry(1,4,4);
    esfera_material.flatShading = true;
    esfera_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.esfera = new THREE.Mesh(esfera_geometria, esfera_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.esfera);
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.radio = 1.0;
      this.resol_ecua = 4.0;
      this.resol_meri = 4.0;

      this.rotZ=0.0;
  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'radio', 1.0, 5.0, 0.1).name('Radio ').listen();
    folder.add(this.guiControls, 'resol_ecua', 4.0, 20.0, 1.0).name('Res. Ecuador ').onChange(function(value){that.rebuild()});
    folder.add(this.guiControls, 'resol_meri', 4.0, 20.0, 1.0).name('Res. Meridiano ').onChange(function(value){that.rebuild()});

  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.rotZ += 0.01;
    this.scale.set (this.guiControls.radio,this.guiControls.radio,this.guiControls.radio);
    this.rotation.set (0.0,0.0,this.guiControls.rotZ);
  }

  rebuild(){
    var esfera_geometria=new THREE.SphereGeometry(this.guiControls.radio,this.guiControls.resol_ecua,this.guiControls.resol_meri);
    this.esfera.geometry=esfera_geometria;
    this.scale.set (this.guiControls.radio,this.guiControls.radio,this.guiControls.radio);
  }
}

export { Esfera }
