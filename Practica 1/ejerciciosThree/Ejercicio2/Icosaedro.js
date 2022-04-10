import * as THREE from '../libs/three.module.js'

class Icosaedro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var icosaedro_material = new THREE.MeshNormalMaterial();
    var icosaedro_geom = new THREE.IcosahedronGeometry(1,0);
    icosaedro_material.flatShading = true;
    icosaedro_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.icosaedro = new THREE.Mesh(icosaedro_geom, icosaedro_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.icosaedro);
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.radio=1.0;
      this.subdiv = 0.0;

      this.rotZ=0.0;
    }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'radio', 1.0, 10.0, 0.5).name('Radio ').listen();
    folder.add(this.guiControls, 'subdiv', 0.0, 5.0, 1.0).name('Subdivision ').onChange(function(value){that.rebuild()});

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
    var icosaedro_geometria=new THREE.IcosahedronGeometry(this.guiControls.radio,this.guiControls.subdiv);
    this.icosaedro.geometry=icosaedro_geometria;
    this.scale.set (this.guiControls.radio,this.guiControls.radio,this.guiControls.radio);
  }
}

export { Icosaedro }
