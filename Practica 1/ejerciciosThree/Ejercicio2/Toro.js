import * as THREE from '../libs/three.module.js'

class Toro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var toro_material = new THREE.MeshNormalMaterial();
    var toro_geometria = new THREE.TorusGeometry(1,0.2,3,3);
    toro_material.flatShading = true;
    toro_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.toro = new THREE.Mesh(toro_geometria, toro_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.toro);

  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.radio_toro = 1.0;
      this.radio_tubo = 0.2;
      this.res_toro = 3.0;
      this.res_tubo = 3.0;

      this.rotZ=0.0;
  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'radio_toro', 1.0, 5.0, 0.1).name('Radio Toro ').listen();
    folder.add(this.guiControls, 'radio_tubo', 0.2, 1.0, 0.1).name('Radio tubo ').onChange(function(value){that.rebuild()});
    folder.add(this.guiControls, 'res_toro', 3.0, 20.0, 1.0).name('Resol. toro ').onChange(function(value){that.rebuild()});
    folder.add(this.guiControls, 'res_tubo', 3.0, 20.0, 1.0).name('Resol. tubo').onChange(function(value){that.rebuild()});

  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.rotZ += 0.01;
    this.rotation.set (0.0,0.0,this.guiControls.rotZ);
    this.scale.set (this.guiControls.radio_toro,this.guiControls.radio_toro,this.guiControls.radio_toro);

  }

  rebuild(){
    var toro_geometria=new THREE.TorusGeometry(this.guiControls.radio_toro,this.guiControls.radio_tubo,this.guiControls.res_toro,this.guiControls.res_tubo);
    this.toro.geometry=toro_geometria;
    this.scale.set (this.guiControls.radio_toro,this.guiControls.radio_toro,this.guiControls.radio_toro);
  }
}

export { Toro }
