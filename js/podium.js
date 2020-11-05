class Floor extends THREE.Object3D {
    constructor(x, y, z, width, height) {
        'use strict'
        super();
        this.width = width;
        this.height = height;
        this.material = new THREE.MeshLambertMaterial({color: 0xa3a38e});
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.position.set(x, y, z);
        scene.add(this);
    }
}

class Podium extends THREE.Object3D {
    constructor(x, y, z, radius, height) {
        'use strict'
        super();
        this.radius = radius;
        this.height = height;
        this.material = new THREE.MeshPhongMaterial({color: 0x560000, wireframe: true});
        this.geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 30);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.position.set(x, y+height/2, z);
        scene.add(this);
    }

    spinLeft(smallAngle) {
        this.rotateY(-smallAngle);
    }

    spinRight(smallAngle) {
        this.rotateY(smallAngle);
    }
}

class Platform extends THREE.Object3D {
    constructor(floor, podium) {
        'use strict'
        super();
        this.floor = floor;
        this.podium =  podium;
        //floor.rotateY(Math.PI);
        floor.rotateX(-Math.PI/2);
    }
}

