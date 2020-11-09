class Cybertruck extends THREE.Object3D {
    constructor(x, y, z) {
        'use strict'
        super();
        this.geometry = new CybertruckGeometry();
        this.mainMaterialPhong = new THREE.MeshPhongMaterial({color: 0xB9C1C7, side: THREE.DoubleSide});
        this.mainMaterialLambert = new THREE.MeshLambertMaterial({color: 0xdadaff, side: THREE.DoubleSide});
        this.mainMaterialBasic = new THREE.MeshBasicMaterial({color: 0xdadaff, side: THREE.DoubleSide});
        this.mainMaterial = this.mainMaterialLambert;
        this.mainMesh = new THREE.Mesh(this.geometry, this.mainMaterial);
        this.headlightsMesh = new THREE.Mesh(this.geometry.headlights, this.mainMaterial);
        this.frontGlassMesh = new THREE.Mesh(this.geometry.frontGlass, this.mainMaterial);
        this.sideGlassMesh = new THREE.Mesh(this.geometry.sideGlass, this.mainMaterial);
        this.add(this.mainMesh);
        this.add(this.headlightsMesh);
        this.add(this.frontGlassMesh);
        this.add(this.sideGlassMesh);
        this.position.set(x, y, z);
        this.chassis = new Chassis();
        this.wheel_topLeft = new Wheel(0, this.chassis.topWire.height/2, 0);
        this.wheel_topRight = new Wheel(0, -this.chassis.topWire.height/2, 0);
        this.wheel_bottomLeft = new Wheel(0, this.chassis.bottomWire.height/2, 0);
        this.wheel_bottomRight = new Wheel(0, -this.chassis.bottomWire.height/2, 0);

        this.chassis.topWire.add(this.wheel_topLeft);
        this.chassis.topWire.add(this.wheel_topRight);
        this.chassis.bottomWire.add(this.wheel_bottomLeft);
        this.chassis.bottomWire.add(this.wheel_bottomRight);

        this.add(this.chassis);
        scene.add(this);
    }

    changeShadingType() {
        if (this.mainMesh.material == this.mainMeshMaterialLambert) {
            this.mainMesh.material = this.mainMaterialPhong;
        }
        else {
            this.mainMesh.material = this.mainMaterialLambert;
        }
    }

    changeLightingCalculations() {
        if (this.mainMesh.material == this.mainMaterialLambert || this.mainMesh.material == this.mainMaterialPhong) {
            this.mainMesh.material = this.mainMaterialBasic;
        }
        else {
            this.mainMesh.material = this.mainMaterialLambert;
        }
    }
}

class headlightsGeometry extends THREE.Geometry {
    constructor(vertices) {
        'use strict'
        super();
        this.vertices = vertices;
        this.createFaces();
        this.computeFaceNormals();
        //this.computeVertexNormals();
    }

    createFaces() {
       //farois
       for(var i = 0;i < 2;i++){
        this.faces.push(new THREE.Face3(20+i, 22+4*i, 23+4*i));
        
        this.faces.push(new THREE.Face3(22+4*i, 23+4*i, 24+4*i));
        this.faces.push(new THREE.Face3(22+4*i, 24+4*i, 25+4*i));
        }
        this.faces.push(new THREE.Face3(23, 24, 27));
        this.faces.push(new THREE.Face3(27, 28, 24));
    }
    
}

class frontGlassGeometry extends THREE.Geometry {
    constructor(vertices) {
        'use strict'
        super();
        this.vertices =  vertices;
        this.createFaces();
        this.computeFaceNormals();
        //this.computeVertexNormals();
    }

    createFaces() {
        //vidro
        this.faces.push(new THREE.Face3(31, 32, 33));
        this.faces.push(new THREE.Face3(30, 31, 32));
    }
}

class sideGlassGeometry extends THREE.Geometry {
    constructor(vertices) {
        'use strict'
        super();
        this.vertices = vertices;
        this.createFaces();
        this.computeFaceNormals();
        //this.computeVertexNormals();
    }

    createFaces() {
        for(var i = 0;i < 2;i++){
            //vidro
            this.faces.push(new THREE.Face3(32+i, 34+3*i, 35+3*i));
            this.faces.push(new THREE.Face3(34+3*i, 35+3*i, 36+3*i));
        }
    }
}

class CybertruckGeometry extends THREE.Geometry {
    constructor() {
        super();
        //this.n_vertices = 30;
        //this.n_faces = 40; //idk
        //this.createFaces();
        this.createVertices();
        this.headlights = new headlightsGeometry(this.vertices);
        this.frontGlass = new frontGlassGeometry(this.vertices);
        this.sideGlass = new sideGlassGeometry(this.vertices);
        this.createFaces();
        this.computeFaceNormals();
        //this.computeVertexNormals();
    }

    createVertices() {
        this.vertices.push(new THREE.Vector3(9.5, 4, 4)); //0
        this.vertices.push(new THREE.Vector3(9.5, 4, -4)); //1
        this.vertices.push(new THREE.Vector3(8.5, 1.5, 4)); //2
        this.vertices.push(new THREE.Vector3(8.5, 1.5, -4)); //3

        this.vertices.push(new THREE.Vector3(7.5, 0.5, 4)); //4
        this.vertices.push(new THREE.Vector3(7.5, 0.5, -4)); //5
        this.vertices.push(new THREE.Vector3(6.5, 1.5, 4)); //6
        this.vertices.push(new THREE.Vector3(6.5, 1.5, -4)); //7
        this.vertices.push(new THREE.Vector3(5, 1.5, 4)); //8
        this.vertices.push(new THREE.Vector3(5, 1.5, -4)); //9
        this.vertices.push(new THREE.Vector3(4, 0.5, 4)); //10
        this.vertices.push(new THREE.Vector3(4, 0.5, -4)); //11

        this.vertices.push(new THREE.Vector3(-4, 0.5, 4)); //12
        this.vertices.push(new THREE.Vector3(-4, 0.5, -4)); //13
        this.vertices.push(new THREE.Vector3(-5, 1.5, 4)); //14
        this.vertices.push(new THREE.Vector3(-5, 1.5, -4)); //15
        this.vertices.push(new THREE.Vector3(-6.5, 1.5, 4)); //16
        this.vertices.push(new THREE.Vector3(-6.5, 1.5, -4)); //17
        this.vertices.push(new THREE.Vector3(-7.5, 0.5, 4)); //18
        this.vertices.push(new THREE.Vector3(-7.5, 0.5, -4)); //19

        this.vertices.push(new THREE.Vector3(-8, 0.5, 4)); //20
        this.vertices.push(new THREE.Vector3(-8, 0.5, -4)); //21

        //farol direito
        this.vertices.push(new THREE.Vector3(-8.2, 1.5, 4)); //22
        this.vertices.push(new THREE.Vector3(-9, 1.5, 2)); //23
        this.vertices.push(new THREE.Vector3(-9, 3, 2)); //24
        this.vertices.push(new THREE.Vector3(-8.2, 3, 4)); //25
        //farol esquerdo
        this.vertices.push(new THREE.Vector3(-8.2, 1.5, -4)); //26
        this.vertices.push(new THREE.Vector3(-9, 1.5, -2)); //27
        this.vertices.push(new THREE.Vector3(-9, 3, -2)); //28
        this.vertices.push(new THREE.Vector3(-8.2, 3, -4)); //29

        //vidro da frente
        this.vertices.push(new THREE.Vector3(-7, 4.3, 2.8)); //30
        this.vertices.push(new THREE.Vector3(-7, 4.3, -2.8)); //31
        this.vertices.push(new THREE.Vector3(-2, 6.5, 3)); //32
        this.vertices.push(new THREE.Vector3(-2, 6.5, -3)); //33

        //vidro lateral direito
        this.vertices.push(new THREE.Vector3(-6.43, 4, 3.71)); //34
        this.vertices.push(new THREE.Vector3(4.92, 5, 3.6)); //35
        this.vertices.push(new THREE.Vector3(4.92, 4, 3.92)); //36

        //vidro lateral esquerdo
        this.vertices.push(new THREE.Vector3(-6.43, 4, -3.71)); //37
        this.vertices.push(new THREE.Vector3(4.92, 5, -3.6)); //38
        this.vertices.push(new THREE.Vector3(4.92, 4, -3.92)); //39
    }

    createFaces() {
        this.faces.push(new THREE.Face3(0, 1, 2));
        this.faces.push(new THREE.Face3(1, 2, 3));
        this.faces.push(new THREE.Face3(2, 3, 4));
        this.faces.push(new THREE.Face3(3, 4, 5));

        //à volta das rodas
        for(var i = 0; i < 2;i++){
            this.faces.push(new THREE.Face3(4+8*i, 5+8*i, 6+8*i));
            this.faces.push(new THREE.Face3(7+8*i, 6+8*i, 5+8*i));
            this.faces.push(new THREE.Face3(8+8*i, 9+8*i, 6+8*i));
            this.faces.push(new THREE.Face3(6+8*i, 7+8*i, 9+8*i));
            this.faces.push(new THREE.Face3(8+8*i, 9+8*i, 10+8*i));
            this.faces.push(new THREE.Face3(10+8*i, 11+8*i, 9+8*i));

            this.faces.push(new THREE.Face3(10+8*i, 12+8*i, 13+8*i));
            this.faces.push(new THREE.Face3(13+8*i, 10+8*i, 11+8*i));
        }

        //farois
        /*for(var i = 0;i < 2;i++){
            this.faces.push(new THREE.Face3(20+i, 22+4*i, 23+4*i));
            
            this.faces.push(new THREE.Face3(22+4*i, 23+4*i, 24+4*i));
            this.faces.push(new THREE.Face3(22+4*i, 24+4*i, 25+4*i));
        }
        this.faces.push(new THREE.Face3(23, 24, 27));
        this.faces.push(new THREE.Face3(27, 28, 24));*/

        this.faces.push(new THREE.Face3(20, 23, 27));
        this.faces.push(new THREE.Face3(21, 27, 20));
       

        //tejadilho
        this.faces.push(new THREE.Face3(24, 25, 30));
        this.faces.push(new THREE.Face3(24, 28, 30));
        this.faces.push(new THREE.Face3(28, 31, 30));
        this.faces.push(new THREE.Face3(28, 29, 31));
        this.faces.push(new THREE.Face3(24, 25, 30));

            //vidro
            /*this.faces.push(new THREE.Face3(31, 32, 33));
            this.faces.push(new THREE.Face3(30, 31, 32));*/
        
        this.faces.push(new THREE.Face3(25, 30, 32));
        this.faces.push(new THREE.Face3(29, 31, 33));
    
        this.faces.push(new THREE.Face3(32, 33, 0));
        this.faces.push(new THREE.Face3(33, 0, 1));

        //laterais
        for(var i = 0;i < 2;i++){
            this.faces.push(new THREE.Face3(0+i, 2+i, 6+i));
            this.faces.push(new THREE.Face3(2+i, 4+i, 6+i));
            this.faces.push(new THREE.Face3(8+i, 10+i, 14+i));
            this.faces.push(new THREE.Face3(14+i, 10+i, 12+i));
            this.faces.push(new THREE.Face3(16+i, 18+i, 20+i));
            this.faces.push(new THREE.Face3(16+i, 20+i, 22+4*i));
            this.faces.push(new THREE.Face3(16+i, 22+4*i, 25+4*i));

                //vidro
                /*this.faces.push(new THREE.Face3(32+i, 34+3*i, 35+3*i));
                this.faces.push(new THREE.Face3(34+3*i, 35+3*i, 36+3*i));*/
            
            this.faces.push(new THREE.Face3(0+i, 35+3*i, 36+3*i));
            this.faces.push(new THREE.Face3(0+i, 6+i, 36+3*i));
            this.faces.push(new THREE.Face3(6+i, 8+i, 36+3*i));
            this.faces.push(new THREE.Face3(8+i, 14+i, 36+3*i));
            this.faces.push(new THREE.Face3(14+i, 34+3*i, 36+3*i));
            this.faces.push(new THREE.Face3(14+i, 16+i, 34+3*i));
            this.faces.push(new THREE.Face3(16+i, 25+4*i, 34+3*i));
        }
    }
}

class Chassis extends THREE.Object3D {
    constructor() {
        super();
        this.mainWire = new Wire(0.5, 11.5, 0, 0, Math.PI/2);
        this.topWire = new Wire(0.5, 8, Math.PI/2, 0, 0);
        this.bottomWire = new Wire(0.5, 8, Math.PI/2, 0, 0);

        this.topWire.position.y += 5.75;
        this.bottomWire.position.y -= 5.75;

        this.mainWire.add(this.topWire);
        this.mainWire.add(this.bottomWire);
        this.add(this.mainWire);
        scene.add(this);
    }
}

class Wire extends THREE.Object3D {
    constructor(radius, height, angleX, angleY, angleZ) {
        super();
        this.height = height;
        this.material = new THREE.MeshPhongMaterial({color: 0x000000});
        this.geometry = new THREE.CylinderGeometry(radius, radius, height, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.rotateX(angleX);
        this.rotateY(angleY);
        this.rotateZ(angleZ);
        scene.add(this);
    }
}

class Wheel extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        this.material = new THREE.MeshPhongMaterial({color: 0x000000});
        this.geometry = new THREE.CylinderGeometry(1.2, 1.2, 1, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.position.set(x, y, z);
        this.add(this.mesh);
        scene.add(this);
    }
}



