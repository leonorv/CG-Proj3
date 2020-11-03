const x_axis = new THREE.Vector3(1, 0, 0);
const y_axis = new THREE.Vector3(0, 1, 0);
const z_axis = new THREE.Vector3(0, 0, 1);
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var fov = 50; //Camera frustum vertical field of view.
var far = 1000; //Camera frustum far plane.
var near = 1; //Camera frustum near plane.
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT; //Camera frustum aspect ratio.
var frustumSize = 100;

var global_light;
var spotlights = new Array();

var camera, scene, renderer;
var clock, delta;
var cameraOrtho, cameraPerspective;
var podium, cybertruck;

var smallAngle = 0.1;


var keys = {
    //PODIUM
    37: false, //spin left
    39: false, //spin right
    //GLOBAL LIGHT
    81: false, //q (on or off)
    87: false, //w (light calculations on or off)
    69: false, //e (gouraud or phong)
    //SPOTLIGHTS
    49: false, //1
    50: false, //2
    51: false, //3
    //CAMERAS
    52: false, //4 (perspective)
    53: false //5 (ortho)
}

function createPlattform(floor, podium) {
    plattform = new Plattform(floor, podium);
}

function createCybertruck() {
    cybertruck = new Cybertruck();

}

function createSpotlights() {

}


function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xC5D0D2);
    scene.add(new THREE.AxisHelper(10));

    createPlattform(new Floor(0,0,0,50,50), new Podium(0,0,0,20,3));
    createCybertruck();
}

function createCamera() {
    'use strict';
    cameraOrtho = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, 0.5* frustumSize / 2, 0.5 * frustumSize / - 2, 2, 2000 );
    cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far);
    /*ORTHO POSITION*/
    cameraOrtho.position.set(0,frustumSize,0);
    cameraOrtho.lookAt(scene.position);
    scene.add(cameraOrtho);
    /*PERSPECTIVE POSITION*/
    cameraPerspective.position.set(50, 50, 50);
    cameraPerspective.lookAt(scene.position);
    scene.add(cameraPerspective);

    camera = cameraPerspective;
}

function onResize() {
    'use strict';

    SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    camera.left = - 0.5 * frustumSize * aspect / 2;
    camera.right = 0.5 * frustumSize * aspect / 2;
    camera.top = 0.5 * frustumSize / 2;
    camera.bottom = - 0.5 *  frustumSize / 2;
    camera.updateProjectionMatrix();
}

function onKeyDown(e) {
    'use strict';
    keys[e.keyCode] = true;

    switch(e.keyCode) {
        case 81:
            global_light.changeStatus();
            onResize();
            break;
        case 87:
            global_light.changeCalculationsStatus();
            onResize();
            break;
        case 69:
            global_light.changeShadingType();
            onResize();
            break;
        case 49: 
            spotlights[0].changeStatus();
            onResize();
            break;
        case 50:
            spotlights[1].changeStatus();
            onResize();
            break;
        case 51:
            spotlights[2].changeStatus();
            onResize();
            break;
        case 52:
            camera = cameraPerspective;
            onResize();
            break;
        case 53:
            camera = cameraOrtho;
            onResize();
            break;
    }
}

function onKeyUp(e) {
    'use strict';
    keys[e.keyCode] = false;
}

function render() {
    'use strict';
    delta = clock.getDelta();
    keyPressed(delta);
    renderer.render(scene, camera);
}

function keyPressed() {
    if(keys[37]) { //left
        podium.spinLeft(smallAngle);
    }
    if(keys[39]) { //right
        podium.spinRight(smallAngle);
    }
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    clock.start();

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);

    clock = new THREE.Clock();
}


function animate() {
    "use strict";

    render();
    requestAnimationFrame(animate);
}