import * as THREE from '../libs/three.module.js'

class Pendulo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.h_cajaV=4;
    this.h_pendulo_G=5;
    this.Tam_pendulo_G=4;

    this.h_pendulo_P = 10;
    this.Tam_pendulo_P=2;

    this.penduloGrande=this.createPenduloGrande();

    this.penduloPeque=this.createPenduloPeque();

    // Y añadirlo como hijo del Object3D (el this)

    this.add(this.penduloGrande);
    this.add(this.penduloPeque);


  }

  createPenduloGrande(){
    var penduloG = new THREE.Object3D();

    var material_cajaVer = new THREE.MeshPhongMaterial({color: 0x04750D});
    var material_cuerpo = new THREE.MeshPhongMaterial({color: 0xC9130B});
    var material_eje = new THREE.MeshPhongMaterial({color: 0xC662DD});

    //caja verde superior
    var cajaSup_geom = new THREE.BoxGeometry(this.Tam_pendulo_G,this.h_cajaV,this.Tam_pendulo_G);
    this.caja_Sup = new THREE.Mesh(cajaSup_geom, material_cajaVer);

    //cuerpo del pendulo pendulo grande
    var cuerpo_geom = new THREE.BoxGeometry(this.Tam_pendulo_G,this.h_pendulo_G,this.Tam_pendulo_G);
    cuerpo_geom.translate(0,-this.h_pendulo_G/2,0);
    this.cuerpo_penduloG= new THREE.Mesh(cuerpo_geom,material_cuerpo);

    //caja verde inferior
    var cajaInf_geom = new THREE.BoxGeometry(this.Tam_pendulo_G,this.h_cajaV,this.Tam_pendulo_G);
    cajaInf_geom.translate(0,-this.h_cajaV/2,0);
    this.caja_Inf = new THREE.Mesh(cajaInf_geom, material_cajaVer);

    //Eje del pendulo grande
    var eje_geom = new THREE.CylinderGeometry(1,1,4.1,8);
    eje_geom.rotateX(Math.PI/2);
    this.eje_G=new THREE.Mesh(eje_geom,material_eje);

    penduloG.add(this.caja_Sup);
    penduloG.add(this.cuerpo_penduloG);
    penduloG.add(this.caja_Inf);
    penduloG.add(this.eje_G);

    return penduloG;
  }

  createPenduloPeque(){
    this.penduloP = new THREE.Object3D();

    var material_eje = new THREE.MeshPhongMaterial({color: 0x0D6D1B});
    var material_cuerpo = new THREE.MeshPhongMaterial({color: 0x2321D3});

    //Eje del pendulo peque
    var eje_geom = new THREE.CylinderGeometry(0.5,0.5,2.1,8);
    eje_geom.rotateX(Math.PI/2);
    eje_geom.translate(0,0,3);
    this.eje_P=new THREE.Mesh(eje_geom,material_eje);

    var cuerpo_geom = new THREE.BoxGeometry(this.Tam_pendulo_P,this.h_pendulo_P,this.Tam_pendulo_P);
    cuerpo_geom.translate(0,-this.h_pendulo_P/2,2.9);
    this.cuerpo_penduloP= new THREE.Mesh(cuerpo_geom,material_cuerpo);

    this.penduloP.add(this.cuerpo_penduloP);
    this.penduloP.add(this.eje_P);

    return this.penduloP;
  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      //parametros del pendulo grande
      this.rotZ_G = 0;
      this.longPenduloG = 1;
      this.posCajaInf;

      //parametros del pendulo peque
      this.longPenduloP=1;
      this.rotZ_P=0;
      this.porcentaje=0.1;
      this.posPendP;
    }

    var folder=gui.addFolder(titleGui);
    folder.add(this.guiControls, 'longPenduloG', 1.0, 2.0, 0.1).name('Long Pend G ').listen();
    folder.add(this.guiControls, 'rotZ_G', -Math.PI/4, Math.PI/4, 0.01).name('Giro Pend G ').listen();

    folder.add(this.guiControls, 'longPenduloP', 1.0, 2.0, 0.1).name('Long Pend P ').listen();
    folder.add(this.guiControls, 'rotZ_P', -Math.PI/4, Math.PI/4, 0.01).name('Giro Pend P ').listen();
    folder.add(this.guiControls, 'porcentaje', 0.1, 0.9, 0.1).name('% Posicion Pend P ').listen();
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    //movimientos del pendulo grande
    this.rotation.set(0.0,0.0,this.guiControls.rotZ_G);
    this.cuerpo_penduloG.scale.set (1,this.guiControls.longPenduloG,1);
    this.cuerpo_penduloG.position.set(0,-2,0);
    this.guiControls.posCajaInf = -(2+this.h_pendulo_G*this.guiControls.longPenduloG);
    this.caja_Inf.position.set(0,this.guiControls.posCajaInf,0);

    //movimientos del pendulo peque
    this.cuerpo_penduloP.scale.set (1,this.guiControls.longPenduloP,1);
    this.cuerpo_penduloP.position.set(0.0,1.2,0.0);
    this.penduloP.rotation.set(0.0,0.0,this.guiControls.rotZ_P);
  //this.penduloP.position.set(0.0,-(2+0.5/2),0.0);
    this.guiControls.posPendP=(this.guiControls.porcentaje*this.h_pendulo_G*this.guiControls.longPenduloG)+(2+0.5/2);
    this.penduloP.position.set(0.0,-this.guiControls.posPendP,0.0);
  }
}

export { Pendulo }
