/*global window, jQuery, THREE */
$(window).load(function () {
    var scene, camera, renderer, controls;
    var gui;

    var guiController = {
        "cameraZpos": 300,
        "vecy" : 10
    };

    var arnoldr = {
        "label" : "arnoldr"
    }
    var nedryd = {
        "label" : "nedryd"
    }
    var usr = {
        "label": "usr",
        "dir": [ nedryd, arnoldr]
    }
    var sys = {
        "label" : "sys",
        "dir" : []
    }
    var root = {
        "label": "/",
        "dir" : [ sys, usr ]
    }
    var fileSystem = {
        "dir" : root
    };

    function init() {

        // set the scene size
        var WIDTH = 800,
            HEIGHT = 600;

        // set some camera attributes
        var VIEW_ANGLE = 45,
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,
            FAR = 10000;

        // create a WebGL renderer, camera
        // and a scene
        renderer = new THREE.WebGLRenderer();
        camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);

        controls = new THREE.OrbitControls(camera);
        controls.center.set(0.0, 100.0, 0.0);
        controls.userPanSpeed = 100;

        scene = new THREE.Scene();

        var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
        var groundMat = new THREE.MeshPhongMaterial({ ambient: 0xffffff, color: 0xffffff, specular: 0x050505 });
        groundMat.color.setHex(0xFF8080);

        var ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        scene.add(ground);

        var boxMaterial = new THREE.MeshLambertMaterial({
            color: 0xFA076C
        });
        var directoryBoxGeometry = new THREE.BoxGeometry(100, 10, 30);
        var directoryBox = new THREE.Mesh(
            directoryBoxGeometry,
            boxMaterial);
        directoryBox.position.set(-100, 5, 0);
        scene.add(directoryBox);

        var otherBox = new THREE.Mesh(
            directoryBoxGeometry,
            boxMaterial);
        otherBox.position.set(100, 5, 0);
        scene.add(otherBox);

        var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
        var outlineMesh = new THREE.Mesh(directoryBoxGeometry, outlineMaterial);
        outlineMesh.position = otherBox.position;
        outlineMesh.scale.multiplyScalar(1.05);
        scene.add(outlineMesh);

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);
        // create a point light
        var pointLight = new THREE.PointLight(0xFFFFFF);

        gui = new dat.GUI();
        //gui.add(camera.position, 'z', -600, 600).step(5);
        //gui.add(camera.position, 'y', -100, 100).step(5).onChange(onYposChanged);
        //gui.add(camera.position, 'x', -100, 100).step(5).onChange(onXposChanged);

        function onYposChanged(value) {
            console.log("y" + value);
            console.log("camera.position.y" + camera.position.y);
            var vector = new THREE.Vector3(camera.position.x, camera.position.z, camera.position.y).negate();
            camera.lookAt(vector);
        };

        function onXposChanged(value) {
            console.log("x" + value);
            console.log("camera.position.x" + camera.position.x);
            var vector = new THREE.Vector3(camera.position.x, camera.position.z, camera.position.y).negate();
            camera.lookAt(vector);
        };

        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;
        scene.add(pointLight);

        // add the camera to the scene
        scene.add(camera);

        // the camera starts at 0,0,0
        // so pull it back
        camera.position.z = 300;
        
        // start the renderer
        renderer.setSize(WIDTH, HEIGHT);

        // attach the render-supplied DOM element
        document.body.appendChild(renderer.domElement);
    };

    function attachListeners() {
        document.addEventListener('mousedown', onDocumentMouseDown, false);

        function onDocumentMouseDown(event) {
            //var vector = new THREE.Vector3(0, guiController.vecy, 0);
            //vector.project(camera);
            console.log("(" + event.clientX + "," + event.clientY + ")");
        };
    }

    var time = 0;
    function animate() {
        time = Date.now();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    init();
    attachListeners();
    animate();
});

// doesn't work, canvas element not rendered by the time this is executed?
$("body.canvas").click(function() {
    console.log("Clicked");
    //console.log("(" + event.clientX + "," + event.clientY + ")");
});