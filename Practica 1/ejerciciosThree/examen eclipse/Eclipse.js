import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Eclipse extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //crear eclipse
    this.curve = new THREE.EllipseCurve(
    	0,  0,            // ax, aY
    	4, 4,           // xRadius, yRadius
    	0,  2 * Math.PI,  // aStartAngle, aEndAngle
    	false,            // aClockwise
    	0                 // aRotation
    );

    this.points = this.curve.getPoints( 50 );
    this.puntos=[];

    this.points.forEach(e => {
      this.puntos.push(new THREE.Vector3(e.x,1,e.y));
    });

    //spline para el movimiento
    this.spline=new THREE.CatmullRomCurve3(this.puntos);

    const geometry = new THREE.BufferGeometry().setFromPoints( this.puntos );

    const material = new THREE.LineBasicMaterial( { color : 0x000000 } );

    // Create the final object to add to the scene
    this.lineaEclipse = new THREE.Line( geometry, material );

    var shape=new THREE.Shape(this.points);
    var extrusion = {depth: 2, bevelEnabled: false};
    var eclipse_geometria=new THREE.ExtrudeBufferGeometry(shape,extrusion);
    eclipse_geometria.rotateX(-Math.PI/2);
    var eclipse_material=new THREE.MeshNormalMaterial({transparent: true, opacity: 0.4});

    this.eclipse=new THREE.Mesh(eclipse_geometria,eclipse_material);

    //bola
    var esfera_material = new THREE.MeshNormalMaterial();
    var esfera_geometria= new THREE.SphereGeometry(0.8,30,30);
    this.bola=new THREE.Mesh(esfera_geometria,esfera_material);

    //movimiento
    var origen={p:0};
    var dest={p:1};

    var movimiento=new TWEEN.Tween(origen)
                    .to(dest, 4000)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(()=>{
                      var posicion = this.spline.getPointAt(origen.p);
                      this.bola.position.copy(posicion);
                      var tangente = this.spline.getTangentAt(origen.p);
                      posicion.add(tangente);

                      this.bola.lookAt(posicion);
                    });

    this.add(this.eclipse);
    this.add(this.bola);
    //this.add(this.lineaEclipse);

    movimiento.repeat(Infinity);
    movimiento.start();


  }

  createGUI (gui,titleGui) {
    this.guiControls=new function(){
      this.extension = 4;

  }

    var folder=gui.addFolder(titleGui);
    var that=this;
    folder.add(this.guiControls, 'extension', 4, 10, 0.5).name('Extension ').onChange(function(value){that.rebuild()});
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

  rebuild(){
    var new_curve = new THREE.EllipseCurve(
    	0,  0,            // ax, aY
    	this.guiControls.extension, 4,           // xRadius, yRadius
    	0,  2 * Math.PI,  // aStartAngle, aEndAngle
    	false,            // aClockwise
    	0                 // aRotation
    );

    this.points = new_curve.getPoints( 50 );
    this.puntos=[];

    this.points.forEach(e => {
      this.puntos.push(new THREE.Vector3(e.x,1,e.y));
    });

    this.spline=new THREE.CatmullRomCurve3(this.puntos);

    var new_geometry = new THREE.BufferGeometry().setFromPoints( this.puntos );
    this.lineaEclipse.geometry=new_geometry;

    var shape=new THREE.Shape(this.points);
    var extrusion = {depth: 2, bevelEnabled: false};
    var new_eclipse_geometria=new THREE.ExtrudeBufferGeometry(shape,extrusion);
    new_eclipse_geometria.rotateX(-Math.PI/2);

    this.eclipse.geometry=new_eclipse_geometria;

  }


}

export { Eclipse }
