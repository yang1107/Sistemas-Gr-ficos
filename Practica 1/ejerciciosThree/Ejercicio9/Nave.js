import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Nave extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
  //  this.createGUI(gui,titleGui);

    var textura=new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material=new THREE.MeshPhongMaterial({map: textura});

    var geometria= new THREE.ConeGeometry(1,4,3);
    geometria.rotateX(Math.PI/2);

    this.nave=new THREE.Mesh(geometria,material);

    var recorrido = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, -3, -5),
                     new THREE.Vector3(25, 0, 0), new THREE.Vector3(10, 3, 5),
                     new THREE.Vector3(0, 0, 0), new THREE.Vector3(-10, -3, -5),
                     new THREE.Vector3(-25, 0, 0), new THREE.Vector3(-10, 3, 5),
                     new THREE.Vector3(0, 0, 0)];

    this.spline=new THREE.CatmullRomCurve3(recorrido);

    var geometryLine=new THREE.Geometry();
    geometryLine.vertices=this.spline.getPoints(100);
    var line_material=new THREE.LineBasicMaterial({color: 0xff0000});
    var visibleSpline=new THREE.Line(geometryLine,line_material);

    this.add(this.nave);
    this.add(visibleSpline);

    var origen1={p:0};
    var dest1={p:0.5};

    var movimiento1=new TWEEN.Tween(origen1)
                    .to(dest1, 4000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(()=>{
                      var posicion = this.spline.getPointAt(origen1.p);
                      this.nave.position.copy(posicion);
                      var tangente = this.spline.getTangentAt(origen1.p);
                      posicion.add(tangente);

                      this.nave.lookAt(posicion);
                    });

      var origen2={p:0.5};
      var dest2={p:1};

      var movimiento2=new TWEEN.Tween(origen2)
                      .to(dest2, 4000)
                      .easing(TWEEN.Easing.Quadratic.InOut)
                      .onUpdate(()=>{
                        var posicion = this.spline.getPointAt(origen2.p);
                        this.nave.position.copy(posicion);
                        var tangente = this.spline.getTangentAt(origen2.p);
                        posicion.add(tangente);

                        this.nave.lookAt(posicion);
                      });

    movimiento1.chain(movimiento2);
    movimiento2.chain(movimiento1);
    movimiento1.start();
  }


  createGUI (gui,titleGui) {
    this.guiControls=new function(){

    }

    var folder=gui.addFolder(titleGui);
  //  folder.add(this.guiControls, 'velocidad', -12, 12, 1).name('Velocidad ').listen();

  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    TWEEN.update();
  }
}

export { Nave }
