class Lamp extends THREE.Group {
    constructor(radius,height) {
        'use strict'
        super();

        this.material = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
        this.cone = new THREE.ConeGeometry(radius, height);
        this.sphere = new THREE.SphereGeometry(radius/2, 10, 10);
        this.coneMesh = new THREE.Mesh(this.cone, this.material);
        this.sphereMesh = new THREE.Mesh(this.sphere, this.material);
        this.coneMesh.position.set(0,0,0);
        this.coneMesh.add(this.sphereMesh);
        this.add(this.coneMesh);
        this.sphereMesh.position.y -= height/2;
        scene.add(this);
    }
}

class Spotlight extends THREE.SpotLight {
    constructor(x,y,z, solid, angleX, angleZ, targetX, targetY, targetZ, color) {
        'use strict'
        super(color, 0.5, 0, Math.PI/8, 0);
        this.position.set(x,y,z);
        this.add(solid);
        this.target = new THREE.Object3D();
        this.target.position.set(targetX, targetY, targetZ);

        solid.coneMesh.rotateZ(angleX);
        solid.coneMesh.rotateX(angleZ);
        scene.add(this);
    }

    changeStatus() {
        if (this.intensity == 0)
            this.intensity = 0.5;
        else
            this.intensity = 0;
    }
}


