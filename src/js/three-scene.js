// Simple Three.js Background Scene using ES Modules
// With 3D model loading and animations

// Import Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Global variables
let scene, camera, renderer;
let animationId = null;
let mixer = null;
let loadedModel = null;

// Initialize simple Three.js scene
function initThreeBackground() {
    console.log('Initializing simple Three.js scene with ES modules...');
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    // Create camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add renderer to container
    const container = document.getElementById('threejs-background');
    if (container) {
        container.appendChild(renderer.domElement);
    } else {
        console.error('Container #threejs-background not found!');
        return;
    }
    
    // Add simple lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create interesting background scene
    createInterestingBackground();
    
    // Load the 3D model
    loadGLBModel();
    
    // Start animation
    animate();
    
    console.log('Simple Three.js scene initialized successfully');
}

// Create interesting background
function createInterestingBackground() {
    // No ground needed - just floating elements
    
    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
        new THREE.SphereGeometry(1, 8, 8),
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.TetrahedronGeometry(1.2),
        new THREE.OctahedronGeometry(1),
        new THREE.TorusGeometry(1, 0.3, 8, 16)
    ];
    
    const colors = [0x667eea, 0x764ba2, 0x28a745, 0xff6b6b, 0xffa500];
    
    for (let i = 0; i < 20; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const material = new THREE.MeshLambertMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.7
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Random positioning
        mesh.position.set(
            (Math.random() - 0.5) * 60,
            Math.random() * 15 + 2,
            (Math.random() - 0.5) * 60
        );
        
        // Random rotation
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        // Store animation properties
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.01 + 0.005,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };
        
        shapes.push(mesh);
        scene.add(mesh);
    }
    
    // Create particle system
    createParticleSystem();
    
    // Create distant mountains
    createMountains();
}

// Create particle system for atmosphere
function createParticleSystem() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;     // x
        positions[i + 1] = Math.random() * 50;          // y
        positions[i + 2] = (Math.random() - 0.5) * 200; // z
        
        // Create color variation
        const hue = 0.6 + Math.random() * 0.2; // Blue to purple
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5 + Math.random() * 0.3);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

// Create distant mountains
function createMountains() {
    const mountainGeometry = new THREE.ConeGeometry(5, 12, 8);
    const mountainMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x2a2a2a,
        transparent: true,
        opacity: 0.6
    });
    
    const mountainPositions = [
        { x: -40, y: 6, z: -80 },
        { x: 30, y: 6, z: -85 },
        { x: -20, y: 6, z: -90 },
        { x: 50, y: 6, z: -75 },
        { x: -60, y: 6, z: -70 },
        { x: 70, y: 6, z: -95 }
    ];
    
    mountainPositions.forEach(pos => {
        const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
        mountain.position.set(pos.x, pos.y, pos.z);
        scene.add(mountain);
    });
}

// Load the GLB model with animations
function loadGLBModel() {
    const loader = new GLTFLoader();
    
    loader.load(
        'src/models/studios_website.glb',
        function (gltf) {
            console.log('GLB model loaded successfully');
            
            loadedModel = gltf.scene;
            
            // Scale and position the model
            loadedModel.scale.set(1, 1, 1);
            loadedModel.position.set(0, 0, 0);
            
            // Enable shadows for all meshes in the model
            loadedModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    // Enhance materials if they exist
                    if (child.material) {
                        child.material.needsUpdate = true;
                    }
                }
            });
            
            scene.add(loadedModel);
            
            // Set up animations if they exist
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(loadedModel);
                
                // Play all animations on loop
                gltf.animations.forEach((clip) => {
                    const action = mixer.clipAction(clip);
                    action.setLoop(THREE.LoopRepeat);
                    action.play();
                    console.log('Playing animation:', clip.name);
                });
                
                console.log(`Loaded ${gltf.animations.length} animations`);
            } else {
                console.log('No animations found in the model');
            }
            
            // Adjust camera to frame the model
            const box = new THREE.Box3().setFromObject(loadedModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            
            // Position camera to show the model nicely
            camera.position.set(center.x, center.y + 2, center.z + cameraZ * 1.5);
            camera.lookAt(center);
            
        },
        function (progress) {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        function (error) {
            console.error('Error loading GLB model:', error);
            console.log('Creating fallback cube instead');
            createFallbackCube();
        }
    );
}

// Create fallback cube if model fails to load
function createFallbackCube() {
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x667eea,
        transparent: true,
        opacity: 0.8
    });
    
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 1, 0);
    scene.add(cube);
    
    console.log('Fallback cube created');
}

// Animation loop with interesting effects
function animate() {
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    const deltaTime = 0.016; // Approximate 60fps
    
    // Update model animations if mixer exists
    if (mixer) {
        mixer.update(deltaTime);
    }
    
    // Animate floating shapes
    scene.children.forEach(child => {
        if (child.userData && child.userData.rotationSpeed) {
            // Rotation animation
            child.rotation.x += child.userData.rotationSpeed.x;
            child.rotation.y += child.userData.rotationSpeed.y;
            child.rotation.z += child.userData.rotationSpeed.z;
            
            // Floating animation
            const floatY = Math.sin(time * child.userData.floatSpeed + child.userData.floatOffset) * 2;
            child.position.y = child.userData.originalY + floatY;
        }
    });
    
    // Subtle camera movement (only if model isn't loaded yet)
    if (!loadedModel) {
        camera.position.x = Math.sin(time * 0.1) * 2;
        camera.position.z = 10 + Math.cos(time * 0.1) * 1;
        camera.lookAt(0, 2, 0);
    }
    
    // Render scene
    renderer.render(scene, camera);
}

// Handle window resize
function resizeThreeBackground() {
    if (!renderer) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

// Clean up
function disposeThreeBackground() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Stop and clean up animations
    if (mixer) {
        mixer.stopAllAction();
        mixer = null;
    }
    
    // Clean up model
    if (loadedModel) {
        scene.remove(loadedModel);
        loadedModel.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        loadedModel = null;
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    console.log('Three.js scene disposed');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Three.js with ES modules...');
    initThreeBackground();
    
    // Handle window resize
    window.addEventListener('resize', resizeThreeBackground);
});

// Export functions
window.ThreeBackground = {
    initThreeBackground,
    resizeThreeBackground,
    disposeThreeBackground
};

console.log('Simple Three.js scene module loaded with ES modules'); 