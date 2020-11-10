class Lamp extends THREE.Group {
    constructor(radius,height, bulbColor) {
        'use strict'
        super();

        this.bulbColor = bulbColor;

        this.coneLambertMaterial = new THREE.MeshLambertMaterial( {color: 0xD3D3D3});
        this.conePhongMaterial = new THREE.MeshPhongMaterial({ color: 0xD3D3D3});
        this.coneBasicMaterial = new THREE.MeshBasicMaterial({color: 0xD3D3D3});

        this.sphereLambertMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, emissive: bulbColor});
        this.spherePhongMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: bulbColor});
        this.sphereBasicMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

        this.materialStatus = "lambert";
        this.cone = new THREE.ConeGeometry(radius, height);
        this.sphere = new THREE.SphereGeometry(radius/2, 10, 10);
        this.coneMesh = new THREE.Mesh(this.cone, this.coneLambertMaterial);
        this.sphereMesh = new THREE.Mesh(this.sphere, this.sphereLambertMaterial);
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
        this.solid = solid;
        this.add(this.solid);
        this.target = new THREE.Object3D();
        this.target.position.set(targetX, targetY, targetZ);

        this.solid.coneMesh.rotateZ(angleX);
        this.solid.coneMesh.rotateX(angleZ);
        scene.add(this);
    }

    changeStatus() {
        if (this.intensity == 0) {
            this.intensity = 0.5;
            this.solid.sphereMesh.material.emissive = new THREE.Color(this.solid.bulbColor);
        }
        else {
            this.intensity = 0;
            this.solid.sphereMesh.material.emissive = "0xffffff";
        }
    }

    changeShadingType() {
        if (this.solid.materialStatus == "lambert") {
            this.solid.sphereMesh.material = this.solid.spherePhongMaterial;
            this.solid.coneMesh.material = this.solid.conePhongMaterial;
            this.solid.materialStatus = "phong";
        }
        else {
            this.solid.sphereMesh.material = this.solid.sphereLambertMaterial;
            this.solid.coneMesh.material = this.solid.coneLambertMaterial;
            this.solid.materialStatus = "lambert";
        }

    }

    changeLightingCalculations() {

    }
}


