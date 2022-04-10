import * as THREE from '../libs/three.module.js'

class Cono extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var cono_material = new THREE.MeshNormalMaterial();
    var cono_geometria = new THREE.ConeGeometry(1,1,3);
    cono_material.flatShading = true;
    cono_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.cono = new THREE.Mesh(cono_geometria, cono_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cono);
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.radio = 1.0;
      this.altura = 1.0;
      this.resolucion = 3.0;

      this.rotZ=0.0;
  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'radio', 1.0, 5.0, 0.1).name('Radio ').listen();
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
    this.scale.set (this.guiControls.radio,this.guiControls.altura,this.guiControls.radio);
    this.rotation.set (0.0,0.0,this.guiControls.rotZ);
  }

  rebuild(){
    var cono_geometria=new THREE.ConeGeometry(this.guiControls.radio,this.guiControls.altura,this.guiControls.resolucion);
    this.cono.geometry=cono_geometria;
    this.scale.set (this.guiControls.radio,this.guiControls.altura,this.guiControls.radio);
  }
}

export { Cono }
