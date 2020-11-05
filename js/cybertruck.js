class Cybertruck extends THREE.Object3D {
    constructor(x, y, z) {
        'use strict'
        super();
        this.material = new THREE.MeshPhongMaterial({color: 0x000000});
        this.geometry = new CybertruckGeometry();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.position.set(x, y, z);
        scene.add(this);
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
        this.vertices.push(new THREE.Vector3(10, 0, 0));
        this.vertices.push(new THREE.Vector3(0, 20, 0));
        this.vertices.push(new THREE.Vector3(0, 20, 20));
    }

    createFaces() {
        this.faces.push(new THREE.Face3(0, 1, 2));

    }
}