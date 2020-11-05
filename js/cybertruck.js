class Cybertruck extends THREE.Object3D {
    constructor(x, y, z) {
        'use strict'
        super();
        this.material = new THREE.MeshPhongMaterial({color: 0x000000});
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
        this.vertices.push(new THREE.Vector3(-4, 0, 0));
        this.vertices.push(new THREE.Vector3(4, 0, 0));
        this.vertices.push(new THREE.Vector3(-5, 1, 0));
        this.vertices.push(new THREE.Vector3(5, 1, 0));
    }

    createFaces() {
        this.faces.push(new THREE.Face3(0, 1, 2));
        this.faces.push(new THREE.Face3(1, 2, 3));

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
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
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
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
        this.geometry = new THREE.CylinderGeometry(1.2, 1.2, 1, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.position.set(x, y, z);
        this.add(this.mesh);
        scene.add(this);
    }
}
