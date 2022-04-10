import * as THREE from '../libs/three.module.js'

class Cilindro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var cilindro_material = new THREE.MeshNormalMaterial();
    var cilindro_geometria = new THREE.CylinderGeometry(1,1,1,3);
    cilindro_material.flatShading = true;
    cilindro_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.cilindro = new THREE.Mesh(cilindro_geometria, cilindro_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cilindro);

  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.radio_sup = 1.0;
      this.radio_inf = 1.0;
      this.altura = 1.0;
      this.resolucion = 3.0;

      this.rotZ=0.0;
  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'radio_sup', 1.0, 5.0, 0.1).name('Radio superior ').onChange(function(value){that.rebuild()});
    folder.add(this.guiControls, 'radio_inf', 1.0, 5.0, 0.1).name('Radio inferior ').onChange(function(value){that.rebuild()});
    folder.add(this.guiControls, 'altura', 1.0, 10.0, 0.5).name('Altura ').listen();
    folder.add(this.guiControls, 'resolucion', 3.0, 15.0, 1.0).name('Resolucion ').onChange(function(value){that.rebuild()});

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
    this.scale.set (this.guiControls.radio_sup,this.guiControls.altura,this.guiControls.radio_sup);

  }

  rebuild(){
    var cilindro_geometria=new THREE.CylinderGeometry(this.guiControls.radio_sup,this.guiControls.radio_inf,this.guiControls.altura,this.guiControls.resolucion);
    this.cilindro.geometry=cilindro_geometria;
    this.scale.set (this.guiControls.radio_sup,this.guiControls.altura,this.guiControls.radio_sup);
  }
}

export { Cilindro }
