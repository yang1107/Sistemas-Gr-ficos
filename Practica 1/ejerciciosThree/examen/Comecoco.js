import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'
import * as TWEEN from '../libs/tween.esm.js'

class Comecoco extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);


    var esfera_geometria = new THREE.SphereGeometry(1,30,30);

    var cubo_geom = new THREE.BoxGeometry(2,2,2);
    cubo_geom.translate(0,-1,0);

    var cilindro_geometria = new THREE.CylinderGeometry(0.1,0.1,3,20);
    cilindro_geometria.rotateZ(Math.PI/2);
    cilindro_geometria.translate(0,0.5,0);


    var esfera_BSP=new ThreeBSP(esfera_geometria);
    var cubo_BSP=new ThreeBSP(cubo_geom);
    var cilindro_BSP=new ThreeBSP(cilindro_geometria);

    var resultado=esfera_BSP.subtract(cubo_BSP);
    var parte_sup_final=resultado.subtract(cilindro_BSP);

    //var comecoco_material = new THREE.MeshNormalMaterial();
    var comecoco_material = new THREE.MeshPhongMaterial({color: 0xF1C40F});

    this.parte_sup=parte_sup_final.toMesh(comecoco_material);
    this.parte_inf=resultado.toMesh(comecoco_material);

    this.personaje=new THREE.Object3D();
    this.personaje.add(this.parte_inf);
    this.personaje.add(this.parte_sup);
    this.add(this.personaje);

    //Crear spline


    var recorrido = [new THREE.Vector3(-3, 0, 0), new THREE.Vector3(-3, 0, 10),
                    new THREE.Vector3(3, 0, 10), new THREE.Vector3(3, 0, 5),
                    new THREE.Vector3(1, 0, 5), new THREE.Vector3(1, 0, -8),
                    new THREE.Vector3(-3, 0, -8), new THREE.Vector3(-3, 0, 0)];

    this.spline=new THREE.CatmullRomCurve3(recorrido);

    var geometryLine=new THREE.Geometry();
    geometryLine.vertices=this.spline.getPoints(100);
    var line_material=new THREE.LineBasicMaterial({color: 0xff0000});
    var visibleSpline=new THREE.Line(geometryLine,line_material);

    this.add(visibleSpline);

    //hacer animacion

    var origen1={p:0};
    var dest1={p:0.5};

    var movimiento1=new TWEEN.Tween(origen1)
                    .to(dest1, 6000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(()=>{
                      var posicion = this.spline.getPointAt(origen1.p);
                      this.personaje.position.copy(posicion);
                      var tangente = this.spline.getTangentAt(origen1.p);
                      posicion.add(tangente);

                      this.personaje.lookAt(posicion);
                    });

      var origen2={p:0.5};
      var dest2={p:1};

      var movimiento2=new TWEEN.Tween(origen2)
                        .to(dest2, 4000)
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .onUpdate(()=>{
                          var posicion = this.spline.getPointAt(origen2.p);
                          this.personaje.position.copy(posicion);
                          var tangente = this.spline.getTangentAt(origen2.p);
                          posicion.add(tangente);

                          this.personaje.lookAt(posicion);
                        });

      movimiento1.chain(movimiento2);
      movimiento2.chain(movimiento1);
      movimiento1.start();

  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.abrirBoca = Math.PI+0.3;
      this.abierto=true;
      this.contador=3;
    }
  }

  update () {
    //movimiento de abrir la boca

    if(this.guiControls.abierto==true){
      this.guiControls.abrirBoca-=0.1;
      this.guiControls.contador-=1;
    }
    else if(this.guiControls.abierto==false){
      this.guiControls.abrirBoca+=0.1;
      this.guiControls.contador+=1;
    }

    if(this.guiControls.contador>=3){
      this.guiControls.abierto=true;
    }
    else if(this.guiControls.contador<=0){
      this.guiControls.abierto=false;
    }


    this.parte_inf.rotation.set(this.guiControls.abrirBoca,0,0);

  TWEEN.update();

  }
}

export { Comecoco }
