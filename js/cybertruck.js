class Cybertruck extends THREE.Object3D {
    constructor(x, y, z) {
        'use strict'
        super();
        this.geometry = new CybertruckGeometry();
        this.materialPhong = new THREE.MeshPhongMaterial({color: 0xB9C1C7, side: THREE.DoubleSide});
        this.materialLambert = new THREE.MeshLambertMaterial({color: 0xdadaff, side: THREE.DoubleSide});
        this.materialBasic = new THREE.MeshBasicMaterial({color: 0xdadaff, side: THREE.DoubleSide});
        this.material = this.materialLambert;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
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
        if (this.mesh.material == this.materialLambert) {
            this.mesh.material = this.materialPhong;
        }
        else {
            this.mesh.material = this.materialLambert;
        }
    }

    changeLightingCalculations() {
        if (this.mesh.material == this.materialLambert || this.mesh.material == this.materialPhong) {
            this.mesh.material = this.materialBasic;
        }
        else {
            this.mesh.material = this.materialLambert;
        }
    }
}

class CybertruckGeometry extends THREE.Geometry {
    constructor() {
        super();
        //this.n_vertices = 30;
        //this.n_faces = 40; //idk
        this.createVertices();
        this.createFaces();
        this.computeFaceNormals();
        //this.computeVertexNormals();
        //this.setFaceMaterials();
        console.log(this.faces[31].materialIndex);
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

        /*//vidro da frente
        this.vertices.push(new THREE.Vector3(-2, 6.5, 3)); //30
        this.vertices.push(new THREE.Vector3(-2, 6.5, -3)); //31
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58), 3-3/Math.sqrt(58) + 3.5, -2.5)); //32
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58), 3-3/Math.sqrt(58) + 3.5, 2.5)); //33
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58)-(7-21/Math.sqrt(58)), 3-3/Math.sqrt(58)-(3-9/Math.sqrt(58)) + 3.5, -2.5)); //34
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58)-(7-21/Math.sqrt(58)), 3-3/Math.sqrt(58)-(3-9/Math.sqrt(58)) + 3.5, 2.5)); //35
        */

        //maximum height points
        this.vertices.push(new THREE.Vector3(-2, 6.5, 3)); //30
        this.vertices.push(new THREE.Vector3(-2, 6.5, -3)); //31

        //glass frame
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58), 3-3/Math.sqrt(58) + 3.5, -2.5)); //32
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58), 3-3/Math.sqrt(58) + 3.5, 2.5)); //33
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58)-(7-21/Math.sqrt(58)), 3-3/Math.sqrt(58)-(3-9/Math.sqrt(58)) + 3.5, -2.5)); //34
        this.vertices.push(new THREE.Vector3(-2-7/Math.sqrt(58)-(7-21/Math.sqrt(58)), 3-3/Math.sqrt(58)-(3-9/Math.sqrt(58)) + 3.5, 2.5)); //35

        //vidro lateral direito
        this.vertices.push(new THREE.Vector3(-6.43, 4, 3.71)); //36
        this.vertices.push(new THREE.Vector3(4.92, 5, 3.6)); //37
        this.vertices.push(new THREE.Vector3(4.92, 4, 3.92)); //38

        //vidro lateral esquerdo
        this.vertices.push(new THREE.Vector3(-6.43, 4, -3.71)); //39
        this.vertices.push(new THREE.Vector3(4.92, 5, -3.6)); //40
        this.vertices.push(new THREE.Vector3(4.92, 4, -3.92)); //41



    }

    createFaces() {
        this.faces.push(new THREE.Face3(0, 1, 2)); //0
        this.faces.push(new THREE.Face3(1, 2, 3));
        this.faces.push(new THREE.Face3(2, 3, 4));
        this.faces.push(new THREE.Face3(3, 4, 5));

        //à volta das rodas
        for(var i = 0; i < 2;i++){
            this.faces.push(new THREE.Face3(4+8*i, 5+8*i, 6+8*i)); //4 e 12
            this.faces.push(new THREE.Face3(7+8*i, 6+8*i, 5+8*i));
            this.faces.push(new THREE.Face3(8+8*i, 9+8*i, 6+8*i));
            this.faces.push(new THREE.Face3(6+8*i, 7+8*i, 9+8*i));
            this.faces.push(new THREE.Face3(8+8*i, 9+8*i, 10+8*i));
            this.faces.push(new THREE.Face3(10+8*i, 11+8*i, 9+8*i));

            this.faces.push(new THREE.Face3(10+8*i, 12+8*i, 13+8*i));
            this.faces.push(new THREE.Face3(13+8*i, 10+8*i, 11+8*i));
        }

        //farois
        for(var i = 0;i < 2;i++){
            this.faces.push(new THREE.Face3(20+i, 22+4*i, 23+4*i)); //20 e 23
            
            this.faces.push(new THREE.Face3(22+4*i, 23+4*i, 24+4*i));
            this.faces.push(new THREE.Face3(22+4*i, 24+4*i, 25+4*i));
        }
        

        this.faces.push(new THREE.Face3(20, 23, 27)); //26
        this.faces.push(new THREE.Face3(21, 27, 20));
        this.faces.push(new THREE.Face3(23, 24, 27));
        this.faces.push(new THREE.Face3(27, 28, 24));

        //tejadilho
        this.faces.push(new THREE.Face3(32, 33, 34)); //30
        this.faces.push(new THREE.Face3(34, 35, 33));

        this.faces.push(new THREE.Face3(24, 25, 35));
        this.faces.push(new THREE.Face3(24, 28, 35));
        this.faces.push(new THREE.Face3(28, 34, 35));
        this.faces.push(new THREE.Face3(28, 29, 34));
        this.faces.push(new THREE.Face3(30, 35, 25));
        this.faces.push(new THREE.Face3(30, 33, 35));
        this.faces.push(new THREE.Face3(31, 32, 34));
        this.faces.push(new THREE.Face3(29, 31, 34));
        this.faces.push(new THREE.Face3(30, 31, 32));
        this.faces.push(new THREE.Face3(30, 32, 33)); //41
    
        this.faces.push(new THREE.Face3(30, 31, 0));
        this.faces.push(new THREE.Face3(31, 0, 1));

        //laterais
        for(var i = 0;i < 2;i++){
            this.faces.push(new THREE.Face3(0+i, 2+i, 6+i)); //44 e 60
            this.faces.push(new THREE.Face3(2+i, 4+i, 6+i));
            this.faces.push(new THREE.Face3(8+i, 10+i, 14+i));
            this.faces.push(new THREE.Face3(14+i, 10+i, 12+i));
            this.faces.push(new THREE.Face3(16+i, 18+i, 20+i));
            this.faces.push(new THREE.Face3(16+i, 20+i, 22+4*i));
            this.faces.push(new THREE.Face3(16+i, 22+4*i, 25+4*i));

                //vidro
                this.faces.push(new THREE.Face3(30+i, 36+3*i, 37+3*i)); //51 e 67
                this.faces.push(new THREE.Face3(36+3*i, 37+3*i, 38+3*i));
            
            this.faces.push(new THREE.Face3(0+i, 37+3*i, 38+3*i));
            this.faces.push(new THREE.Face3(0+i, 6+i, 38+3*i));
            this.faces.push(new THREE.Face3(6+i, 8+i, 38+i));
            this.faces.push(new THREE.Face3(8+i, 14+i, 38+3*i));
            this.faces.push(new THREE.Face3(14+i, 36+3*i, 38+3*i));
            this.faces.push(new THREE.Face3(14+i, 16+i, 36+3*i));
            this.faces.push(new THREE.Face3(16+i, 25+4*i, 36+3*i)); //last: 75
        }
    }

    setFaceMaterials() {
        for (let i = 0; i < 30; i++) {
            this.faces[i].materialIndex = 0;
        }
        for (let i = 30; i < 32; i++) {
            this.faces[i].materialIndex = 1;
        }
        for (let i = 32; i < 75; i++) {
            this.faces[i].materialIndex = 0;
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
