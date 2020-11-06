class Cybertruck extends THREE.Object3D {
    constructor(x, y, z) {
        'use strict'
        super();
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
        this.geometry = new CybertruckGeometry();
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
}

class CybertruckGeometry extends THREE.Geometry {
    constructor() {
        super();
        //this.n_vertices = 30;
        //this.n_faces = 40; //idk
        this.createVertices();
        this.createFaces();
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

        this.vertices.push(new THREE.Vector3(-2, 6.5, 3)); //30
        this.vertices.push(new THREE.Vector3(-2, 6.5, -3)); //31




    }

    createFaces() {
        this.faces.push(new THREE.Face3(0, 1, 2));
        this.faces.push(new THREE.Face3(1, 2, 3));
        this.faces.push(new THREE.Face3(2, 3, 4));
        this.faces.push(new THREE.Face3(3, 4, 5));

        this.faces.push(new THREE.Face3(4, 5, 6));
        this.faces.push(new THREE.Face3(7, 6, 5));
        this.faces.push(new THREE.Face3(8, 9, 6));
        this.faces.push(new THREE.Face3(6, 7, 9));
        this.faces.push(new THREE.Face3(8, 9, 10));
        this.faces.push(new THREE.Face3(10, 11, 9));

        this.faces.push(new THREE.Face3(10, 12, 13));
        this.faces.push(new THREE.Face3(13, 10, 11));

        this.faces.push(new THREE.Face3(12, 13, 14));
        this.faces.push(new THREE.Face3(15, 14, 13));
        this.faces.push(new THREE.Face3(16, 17, 14));
        this.faces.push(new THREE.Face3(14, 15, 17));
        this.faces.push(new THREE.Face3(16, 17, 18));
        this.faces.push(new THREE.Face3(18, 19, 17));

        this.faces.push(new THREE.Face3(18, 19, 20));
        this.faces.push(new THREE.Face3(20, 21, 19));

        
        this.faces.push(new THREE.Face3(20, 22, 23));
        //farol direito
        this.faces.push(new THREE.Face3(22, 23, 24));
        this.faces.push(new THREE.Face3(22, 24, 25));
        
        this.faces.push(new THREE.Face3(21, 26, 27));
        //farol esquerdo
        this.faces.push(new THREE.Face3(26, 27, 28));
        this.faces.push(new THREE.Face3(26, 28, 29));

        this.faces.push(new THREE.Face3(20, 23, 27));
        this.faces.push(new THREE.Face3(21, 27, 20));
        this.faces.push(new THREE.Face3(23, 24, 27));
        this.faces.push(new THREE.Face3(27, 28, 24));

        //tejadilho
        this.faces.push(new THREE.Face3(24, 25, 30));
        /*this.faces.push(new THREE.Face3(28, 27, 20));
        this.faces.push(new THREE.Face3(23, 24, 27));
        this.faces.push(new THREE.Face3(27, 28, 24));*/





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
