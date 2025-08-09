// Three.js Scene Management for TerraBlitz 3D Website

// Global Three.js variables
let scene, camera, renderer, controls;
let currentMesh = null;
let animationId = null;
let isSceneInitialized = false;

// Scene configuration
const sceneConfig = {
    backgroundColor: 0x000000,
    fogColor: 0x000000,
    fogNear: 1,
    fogFar: 1000,
    cameraFov: 75,
    cameraNear: 0.1,
    cameraFar: 1000
};

// Initialize Three.js scene
function initThreeScene() {
    console.log('Initializing Three.js scene...');
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneConfig.backgroundColor);
    scene.fog = new THREE.Fog(sceneConfig.fogColor, sceneConfig.fogNear, sceneConfig.fogFar);
    
    // Create camera
    const container = document.getElementById('threejs-container');
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(sceneConfig.cameraFov, aspect, sceneConfig.cameraNear, sceneConfig.cameraFar);
    camera.position.set(0, 0, 5);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Add renderer to container
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enableRotate = true;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 2.0;
    }
    
    // Add lights
    addLights();
    
    // Add initial model
    createModel('cube');
    
    // Start animation loop
    animate();
    
    isSceneInitialized = true;
    console.log('Three.js scene initialized successfully');
}

// Add lights to the scene
function addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Directional light (main light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    
    // Point light for additional illumination
    const pointLight = new THREE.PointLight(0x667eea, 0.5, 100);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);
    
    // Hemisphere light for better color balance
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    scene.add(hemisphereLight);
}

// Create different 3D models
function createModel(modelType) {
    // Remove current model if exists
    if (currentMesh) {
        scene.remove(currentMesh);
        currentMesh.geometry.dispose();
        currentMesh.material.dispose();
    }
    
    let geometry, material;
    
    switch (modelType) {
        case 'cube':
            geometry = new THREE.BoxGeometry(2, 2, 2);
            material = new THREE.MeshPhongMaterial({
                color: 0x667eea,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            break;
            
        case 'sphere':
            geometry = new THREE.SphereGeometry(1.5, 32, 32);
            material = new THREE.MeshPhongMaterial({
                color: 0x764ba2,
                shininess: 150,
                transparent: true,
                opacity: 0.8
            });
            break;
            
        case 'torus':
            geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
            material = new THREE.MeshPhongMaterial({
                color: 0x28a745,
                shininess: 200,
                transparent: true,
                opacity: 0.9
            });
            break;
            
        case 'custom':
            // Create a more complex geometry for custom model
            geometry = new THREE.OctahedronGeometry(1.5);
            material = new THREE.MeshPhongMaterial({
                color: 0xff6b6b,
                shininess: 120,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            });
            break;
            
        default:
            geometry = new THREE.BoxGeometry(2, 2, 2);
            material = new THREE.MeshPhongMaterial({
                color: 0x667eea,
                shininess: 100
            });
    }
    
    // Create mesh
    currentMesh = new THREE.Mesh(geometry, material);
    currentMesh.castShadow = true;
    currentMesh.receiveShadow = true;
    
    // Add to scene
    scene.add(currentMesh);
    
    // Reset camera position
    camera.position.set(0, 0, 5);
    if (controls) {
        controls.reset();
    }
    
    console.log(`Created ${modelType} model`);
}

// Update Three.js scene with new model
function updateThreeScene(modelType) {
    if (!isSceneInitialized) {
        console.warn('Three.js scene not initialized yet');
        return;
    }
    
    createModel(modelType);
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Update controls
    if (controls) {
        controls.update();
    }
    
    // Animate current mesh with reduced rotation speed for better performance
    if (currentMesh) {
        currentMesh.rotation.x += 0.003; // Reduced from 0.005
        currentMesh.rotation.y += 0.006; // Reduced from 0.01
    }
    
    // Render scene
    renderer.render(scene, camera);
}

// Handle window resize
function resizeThreeScene() {
    if (!isSceneInitialized) return;
    
    const container = document.getElementById('threejs-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// Initialize model viewer scene (for the models section)
function initModelViewer() {
    console.log('Initializing model viewer...');
    
    const container = document.getElementById('model-container');
    if (!container) {
        console.warn('Model container not found');
        return;
    }
    
    // Create scene for model viewer
    const viewerScene = new THREE.Scene();
    viewerScene.background = new THREE.Color(0xf8f9fa);
    
    // Create camera for model viewer
    const aspect = container.clientWidth / container.clientHeight;
    const viewerCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    viewerCamera.position.set(0, 0, 5);
    
    // Create renderer for model viewer
    const viewerRenderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    viewerRenderer.setSize(container.clientWidth, container.clientHeight);
    viewerRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    viewerRenderer.shadowMap.enabled = true;
    viewerRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(viewerRenderer.domElement);
    
    // Add lights to viewer scene
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    viewerScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    viewerScene.add(directionalLight);
    
    // Add orbit controls for model viewer
    let viewerControls;
    if (typeof THREE.OrbitControls !== 'undefined') {
        viewerControls = new THREE.OrbitControls(viewerCamera, viewerRenderer.domElement);
        viewerControls.enableDamping = true;
        viewerControls.dampingFactor = 0.05;
    }
    
    // Create initial model for viewer
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        shininess: 100
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    viewerScene.add(mesh);
    
    // Animation function for viewer
    function animateViewer() {
        requestAnimationFrame(animateViewer);
        
        if (viewerControls) {
            viewerControls.update();
        }
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        
        viewerRenderer.render(viewerScene, viewerCamera);
    }
    
    animateViewer();
    
    // Handle resize for model viewer
    function resizeViewer() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        viewerCamera.aspect = width / height;
        viewerCamera.updateProjectionMatrix();
        
        viewerRenderer.setSize(width, height);
    }
    
    window.addEventListener('resize', resizeViewer);
    
    console.log('Model viewer initialized');
}

// Load custom 3D model (GLTF/GLB format)
function loadCustomModel(modelPath) {
    if (typeof THREE.GLTFLoader === 'undefined') {
        console.error('GLTFLoader not available');
        return;
    }
    
    const loader = new THREE.GLTFLoader();
    
    loader.load(
        modelPath,
        function (gltf) {
            // Remove current model
            if (currentMesh) {
                scene.remove(currentMesh);
            }
            
            // Add loaded model
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            
            // Enable shadows for all meshes
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(model);
            currentMesh = model;
            
            console.log('Custom model loaded successfully');
        },
        function (progress) {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        function (error) {
            console.error('Error loading model:', error);
        }
    );
}

// Utility function to create particle system
function createParticleSystem() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x667eea,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    return particleSystem;
}

// Clean up resources
function disposeScene() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    if (currentMesh) {
        scene.remove(currentMesh);
        currentMesh.geometry.dispose();
        currentMesh.material.dispose();
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    if (controls) {
        controls.dispose();
    }
    
    console.log('Three.js scene disposed');
}

// Initialize scene when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero scene
    initThreeScene();
    
    // Initialize model viewer when models section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    initModelViewer();
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    });
    
    const modelsSection = document.getElementById('models');
    if (modelsSection) {
        observer.observe(modelsSection);
    }
});

// Export functions for use in other modules
window.ThreeScene = {
    initThreeScene,
    updateThreeScene,
    resizeThreeScene,
    loadCustomModel,
    disposeScene,
    createParticleSystem
};

console.log('Three.js scene module loaded'); 