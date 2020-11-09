class Lamp extends THREE.Group {
    constructor(radius,height) {
        'use strict'
        super();

        this.cone = new THREE.ConeGeometry(radius, height);
        this.coneMaterial = new THREE.MeshBasicMaterial({color: 0xD3D3D3, wireframe: false});
        this.coneMesh = new THREE.Mesh(this.cone, this.coneMaterial);
        this.coneMesh.position.set(0,0,0);
        
        this.sphere = new THREE.SphereGeometry(radius/2, 10, 10);
        this.sphereLambertMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, emissive: 0xffffff});
        this.spherePhongMaterial = new THREE.MeshPhongMaterial({ color: 0x193D66, specular: 0x111111, shininess: 30, emissive: 0xffffff});
        this.sphereBasicMaterial = new THREE.MeshBasicMaterial(0xffffff);
        this.sphereMesh = new THREE.Mesh(this.sphere, this.sphereLambertMaterial);
        
        this.coneMesh.add(this.sphereMesh);
        this.add(this.coneMesh);
        this.sphereMesh.position.y -= height/2;
        scene.add(this);
    }
}

class Spotlight extends THREE.SpotLight {
    constructor(x,y,z, solid, angleX, angleZ, targetX, targetY, targetZ, color) {
        'use strict'
        super(color, 1, 60, Math.PI/8, 0);
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


