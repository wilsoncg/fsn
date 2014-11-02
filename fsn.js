$(window).load(function () {
    var scene, camera, renderer;
    var gui;

    var guiController = {
        "cameraZpos": 300
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

        scene = new THREE.Scene();

        var geometry = new THREE.PlaneGeometry(5, 20, 32);
        var material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // set up the sphere vars
        var radius = 50,
            segments = 16,
            rings = 16;

        // create the sphere's material
        var sphereMaterial = new THREE.MeshLambertMaterial({
            color: 0xCC0000
        });

        // create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
        radius,
        segments,
        rings),
        sphereMaterial);

        // add the sphere to the scene
        scene.add(sphere);

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);
        // create a point light
        var pointLight = new THREE.PointLight(0xFFFFFF);

        gui = new dat.GUI();
        gui.add(camera.position, "z", 50, 1000, 5).onChange(onGuiControllerChanged);
        gui.add(camera.position, "y", 50, 1000, 5);
        gui.add(camera.position, "x", 50, 1000, 5);

        function onGuiControllerChanged(value) {
            console.log("Z position changed" + value);
        };

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);

        // add the camera to the scene
        scene.add(camera);

        // the camera starts at 0,0,0
        // so pull it back
        camera.position.z = guiController.cameraZpos;

        // start the renderer
        renderer.setSize(WIDTH, HEIGHT);

        // attach the render-supplied DOM element
        document.body.appendChild(renderer.domElement);
    }

    var time = 0;

    function animate() {
        time = Date.now();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    init();
    animate();
});