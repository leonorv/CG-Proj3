class Floor extends THREE.Object3D {
    constructor(x, y, z, width, height) {
        'use strict'
        super();
        this.width = width;
        this.height = height;
        this.materialLambert = new THREE.MeshLambertMaterial({color: 0xa3a38e});
        this.materialPhong = new THREE.MeshPhongMaterial({color: 0xa3a38e});
        this.materialBasic = new THREE.MeshBasicMaterial({color: 0xa3a38e});
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
        this.mesh = new THREE.Mesh(this.geometry, this.materialLambert);
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
        this.materialPhong = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});
        this.materialLambert = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
        this.materialBasic = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false});
        this.geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 30);
        this.mesh = new THREE.Mesh(this.geometry, this.materialLambert);
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
        this.materialStatus = "lambert";
        floor.rotateX(-Math.PI/2);
    }

    changeShadingType() {
        if (this.materialStatus == "lambert") {
            this.floor.mesh.material = this.floor.materialPhong;
            this.podium.mesh.material = this.podium.materialPhong;
            this.materialStatus = "phong";
        }
        else {
            this.floor.mesh.material = this.floor.materialLambert;
            this.podium.mesh.material = this.podium.materialLambert;
            this.materialStatus = "lambert";
        }
    }

    changeLightingCalculations() {
        if (this.floor.mesh.material == this.floor.materialLambert || this.floor.mesh.material == this.floor.materialPhong) {
            this.floor.mesh.material = this.floor.materialBasic;
            this.podium.mesh.material = this.podium.materialBasic;
        }
        else {
            this.floor.mesh.material = this.floor.materialLambert;
            this.podium.mesh.material = this.podium.materialLambert;
        }
    }
}

