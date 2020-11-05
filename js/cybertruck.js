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
        this.add(this.chassis);
        this.addWheels();
        scene.add(this);
    }

    addWheels() {
        
    }
}

class CybertruckGeometry extends THREE.Geometry {
    constructor() {
        super();
        this.n_vertices = 30;
        this.n_faces = 40; //idk 
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
        this.mainWire = new Wire(0.5, 9.7, 10, Math.PI/2, 0);
        this.topWire = new Wire(0.5, 9.7, 7, 0, Math.PI/2);
        this.bottomWire = new Wire(0.5, 9.7, 7, 0, Math.PI/2);

        this.mainWire.add(this.topWire);
        this.mainWire.add(this.bottomWire);
        this.add(this.mainWire);
        scene.add(this);
    }
}

class Wire extends THREE.Object3D {
    constructor(radius, height, angleZ, angleY) {
        super();
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
        this.geometry = new THREE.CylinderGeometry(radius, radius, height, 10)
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.rotateZ(angleZ);
        this.rotateY(angleY);
        scene.add(this);
    }
}

class Wheel extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        this.material = new THREE.MeshPhongMaterial({color: 0x000000});
        this.geometry = new CylinderGeometry(1.2, 1.2, 1, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.rotateX(Math.PI/2);
        this.position.set(x, y, z);
        scene.add(this);
    }
}